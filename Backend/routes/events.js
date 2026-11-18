
import { Router } from "express";
import { body, validationResult } from "express-validator";
import pool from "../db.js";
import { requirePermission, requireAuth } from "../middleware/auth.js";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error("Only JPEG, PNG and WebP images are allowed.")
      );
    }

    callback(null, true);
  },
});

const handleInvalidId = (error, res) => {
  if (error.code === "22P02") {
    return res.status(400).json({
      message: "Invalid event ID.",
    });
  }

  return null;
};

const getPosterUrl = (event) => {
  if (event.poster_data) {
    return `/api/events/${event.id}/poster`;
  }

  return event.poster_url;
};


const eventSelect = `
  SELECT
    e.id,
    e.title,
    e.description,
    e.location,
    e.start_time,
    e.end_time,
    e.registration_deadline,
    e.capacity,
    CASE
      WHEN e.poster_data IS NOT NULL
      THEN '/api/events/' || e.id || '/poster'
      ELSE e.poster_url
    END AS poster_url,
    e.poster_alt_text,
    e.is_published,
    e.created_at,
    COALESCE(r.attendance_count, 0)::int AS attendance_count,
    ur.status AS user_rsvp
  FROM events e
  LEFT JOIN LATERAL (
    SELECT COUNT(*) AS attendance_count
    FROM event_rsvps
    WHERE event_id = e.id
      AND status = 'confirmed'
  ) r ON TRUE
  LEFT JOIN event_rsvps ur
    ON ur.event_id = e.id
    AND ur.member_id = $1
    AND ur.status = 'confirmed'
`;

const validateRequest = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Please correct the submitted information.",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });

    return false;
  }

  return true;
};

/* =========================
   GET ALL EVENTS
========================= */


router.get("/", async (req, res) => {
  try {
    const memberId = req.session?.member?.id ?? null;

    const result = await pool.query(
      `${eventSelect}
       WHERE e.is_published = TRUE
          OR EXISTS (
            SELECT 1
            FROM members m
            WHERE m.id = $2
              AND (
                m.role = 'admin'
                OR (
                  m.role = 'leader'
                  AND EXISTS (
                    SELECT 1
                    FROM member_permissions mp
                    INNER JOIN permissions p
                      ON p.id = mp.permission_id
                    WHERE mp.member_id = m.id
                      AND p.permission_key = 'events.manage'
                  )
                )
              )
          )
       ORDER BY e.start_time ASC`,
      [memberId, memberId],
    );

    return res.json({
      events: result.rows,
    });
  } catch (error) {
    console.error("Fetch events error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve events.",
    });
  }
});


/* =========================
   GET EVENT POSTER
========================= */

router.get("/:id/poster", async (req, res) => {
  try {
    const memberId = req.session?.member?.id ?? null;

    const result = await pool.query(
      `SELECT e.poster_data, e.poster_mime_type
       FROM events e
       WHERE e.id = $1
         AND (
           e.is_published = TRUE
           OR EXISTS (
             SELECT 1
             FROM members m
             WHERE m.id = $2
               AND (
                 m.role = 'admin'
                 OR (
                   m.role = 'leader'
                   AND EXISTS (
                     SELECT 1
                     FROM member_permissions mp
                     INNER JOIN permissions p
                       ON p.id = mp.permission_id
                     WHERE mp.member_id = m.id
                       AND p.permission_key = 'events.manage'
                   )
                 )
               )
           )
         )`,
      [req.params.id, memberId],
    );

    if (
      result.rows.length === 0 ||
      !result.rows[0].poster_data
    ) {
      return res.status(404).json({
        message: "Event poster not found.",
      });
    }

    res.set({
      "Content-Type": result.rows[0].poster_mime_type,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    });

    return res.send(result.rows[0].poster_data);
  } catch (error) {
    if (handleInvalidId(error, res)) return;

    console.error("Poster retrieval error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve the event poster.",
    });
  }
});


/* =========================
   UPLOAD EVENT POSTER
========================= */

router.post(
  "/:id/poster",
  requirePermission("events.manage"),
  (req, res, next) => {
    upload.single("poster")(req, res, (error) => {
      if (error) {
        return res.status(400).json({
          message: error.message || "Unable to upload poster.",
        });
      }

      next();
    });
  },
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image to upload.",
        });
      }

      const result = await pool.query(
        `UPDATE events
         SET poster_data = $1,
             poster_mime_type = $2,
             poster_filename = $3,
             poster_url = NULL,
             updated_at = NOW()
         WHERE id = $4
         RETURNING id, title`,
        [
          req.file.buffer,
          req.file.mimetype,
          req.file.originalname,
          req.params.id,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Event not found.",
        });
      }

      return res.json({
        success: true,
        message: "Event poster uploaded successfully.",
        poster_url: `/api/events/${req.params.id}/poster`,
      });
    } catch (error) {
      if (handleInvalidId(error, res)) return;

      console.error("Poster upload error:", error.message);

      return res.status(500).json({
        message: "Unable to save the event poster.",
      });
    }
  }
);

/* =========================
   GET SINGLE EVENT
========================= */

router.get("/:id", async (req, res) => {
  try {
    const memberId = req.session?.member?.id ?? null;

    const result = await pool.query(
      `${eventSelect}
       WHERE e.id = $2
         AND (
           e.is_published = TRUE
           OR EXISTS (
             SELECT 1
             FROM members m
             WHERE m.id = $3
               AND (
                 m.role = 'admin'
                 OR (
                   m.role = 'leader'
                   AND EXISTS (
                     SELECT 1
                     FROM member_permissions mp
                     INNER JOIN permissions p
                       ON p.id = mp.permission_id
                     WHERE mp.member_id = m.id
                       AND p.permission_key = 'events.manage'
                   )
                 )
               )
           )
         )`,
      [memberId, req.params.id, memberId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.json({
      event: result.rows[0],
    });
  } catch (error) {
    if (handleInvalidId(error, res)) return;

    console.error("Fetch event error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve the event.",
    });
  }
});


/* =========================
   GET EVENT ATTENDANCE
========================= */

router.get("/:id/rsvps", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
          e.capacity,
          COUNT(r.id) FILTER (
            WHERE r.status = 'confirmed'
          )::int AS attendance_count
       FROM events e
       LEFT JOIN event_rsvps r
          ON r.event_id = e.id
       WHERE e.id = $1
         AND e.is_published = TRUE
       GROUP BY e.id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.json({
      attendance: result.rows[0],
    });
  } catch (error) {
    if (handleInvalidId(error, res)) return;

    console.error("Fetch attendance error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve attendance.",
    });
  }
});

/* =========================
   GET EVENT COMMENTS
========================= */

router.get("/:id/comments", async (req, res) => {
  try {
    const eventResult = await pool.query(
      `SELECT id
       FROM events
       WHERE id = $1
         AND is_published = TRUE`,
      [req.params.id]
    );

    if (eventResult.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    const result = await pool.query(
      `SELECT
          c.id,
          c.comment,
          c.created_at,
          m.id AS member_id,
          m.full_name
       FROM event_comments c
       JOIN members m
          ON m.id = c.member_id
       WHERE c.event_id = $1
       ORDER BY c.created_at ASC`,
      [req.params.id]
    );

    return res.json({
      comments: result.rows,
    });
  } catch (error) {
    if (handleInvalidId(error, res)) return;

    console.error("Fetch comments error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve comments.",
    });
  }
});

/* =========================
   POST EVENT COMMENT
========================= */

router.post(
  "/:id/comments",
  requireAuth,
  [
    body("comment")
      .isString()
      .withMessage("Comment must be text.")
      .bail()
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage("Comment must contain between 1 and 1000 characters."),
  ],
  async (req, res) => {
    if (!validateRequest(req, res)) return;

    try {
      const eventResult = await pool.query(
        `SELECT id
         FROM events
         WHERE id = $1
           AND is_published = TRUE
           AND COALESCE(end_time, start_time) < NOW()`,
        [req.params.id]
      );

      if (eventResult.rows.length === 0) {
        return res.status(400).json({
          message: "Comments are only available for past events.",
        });
      }

      const result = await pool.query(
        `INSERT INTO event_comments (
          event_id,
          member_id,
          comment
        )
        VALUES ($1, $2, $3)
        RETURNING id, event_id, member_id, comment, created_at`,
        [
          req.params.id,
          req.session.member.id,
          req.body.comment.trim(),
        ]
      );

      return res.status(201).json({
        success: true,
        message: "Comment posted successfully.",
        comment: {
          ...result.rows[0],
          full_name: req.session.member.full_name,
        },
      });
    } catch (error) {
      if (handleInvalidId(error, res)) return;

      console.error("Post comment error:", error.message);

      return res.status(500).json({
        message: "Unable to post your comment.",
      });
    }
  }
);

/* =========================
   CREATE EVENT
========================= */

router.post(
  "/",
  requirePermission("events.manage"),
  [
    body("title")
      .isString()
      .withMessage("Event title must be text.")
      .bail()
      .trim()
      .isLength({ min: 2, max: 200 })
      .withMessage("Title must be between 2 and 200 characters."),

    body("description")
      .optional({ nullable: true })
      .isString(),

    body("location")
      .optional({ nullable: true })
      .isString()
      .isLength({ max: 250 }),

    body("start_time")
      .isISO8601()
      .withMessage("Provide a valid event start date and time."),

    body("end_time")
      .optional({ nullable: true })
      .isISO8601(),

    body("registration_deadline")
      .optional({ nullable: true })
      .isISO8601(),

    body("capacity")
      .optional({ nullable: true })
      .isInt({ min: 1 })
      .withMessage("Capacity must be a positive whole number.")
      .toInt(),

    body("poster_url")
      .optional({ nullable: true })
      .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
      })
      .withMessage("Provide a valid poster URL."),

    body("poster_alt_text")
      .optional({ nullable: true })
      .isString()
      .isLength({ max: 250 }),
  ],
  async (req, res) => {
    if (!validateRequest(req, res)) return;

    const {
      title,
      description = null,
      location = null,
      start_time,
      end_time = null,
      registration_deadline = null,
      capacity = null,
      poster_url = null,
      poster_alt_text = null,
    } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO events (
          title,
          description,
          location,
          start_time,
          end_time,
          registration_deadline,
          capacity,
          poster_url,
          poster_alt_text,
          created_by
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [
          title.trim(),
          description,
          location,
          start_time,
          end_time,
          registration_deadline,
          capacity,
          poster_url,
          poster_alt_text,
          req.session.member.id,
        ]
      );

      return res.status(201).json({
        success: true,
        message: "Event created successfully. It is currently unpublished.",
        event: result.rows[0],
      });
    } catch (error) {
      if (error.code === "23514") {
        return res.status(400).json({
          message: "Check the event dates and capacity.",
        });
      }

      console.error("Create event error:", error.message);

      return res.status(500).json({
        message: "Unable to create the event.",
      });
    }
  }
);

/* =========================
   UPDATE EVENT
========================= */

router.put(
  "/:id",
  requirePermission("events.manage"),
  [
    body("title")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2, max: 200 }),

    body("description")
      .optional({ nullable: true })
      .isString(),

    body("location")
      .optional({ nullable: true })
      .isString()
      .isLength({ max: 250 }),

    body("start_time")
      .optional()
      .isISO8601(),

    body("end_time")
      .optional({ nullable: true })
      .isISO8601(),

    body("registration_deadline")
      .optional({ nullable: true })
      .isISO8601(),

    body("capacity")
      .optional({ nullable: true })
      .isInt({ min: 1 })
      .toInt(),

    body("poster_url")
      .optional({ nullable: true })
      .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
      }),

    body("poster_alt_text")
      .optional({ nullable: true })
      .isString()
      .isLength({ max: 250 }),
  ],
  async (req, res) => {
    if (!validateRequest(req, res)) return;

    const {
      title,
      description,
      location,
      start_time,
      end_time,
      registration_deadline,
      capacity,
      poster_url,
      poster_alt_text,
    } = req.body;

    try {
      const result = await pool.query(
        `UPDATE events
         SET title = COALESCE($1, title),
             description = CASE
               WHEN $2::boolean THEN $3
               ELSE description
             END,
             location = CASE
               WHEN $4::boolean THEN $5
               ELSE location
             END,
             start_time = COALESCE($6, start_time),
             end_time = CASE
               WHEN $7::boolean THEN $8
               ELSE end_time
             END,
             registration_deadline = CASE
               WHEN $9::boolean THEN $10
               ELSE registration_deadline
             END,
             capacity = CASE
               WHEN $11::boolean THEN $12
               ELSE capacity
             END,
             poster_url = CASE
               WHEN $13::boolean THEN $14
               ELSE poster_url
             END,
             poster_alt_text = CASE
               WHEN $15::boolean THEN $16
               ELSE poster_alt_text
             END,
             updated_at = NOW()
         WHERE id = $17
         RETURNING *`,
        [
          title,
          Object.hasOwn(req.body, "description"),
          description ?? null,
          Object.hasOwn(req.body, "location"),
          location ?? null,
          start_time,
          Object.hasOwn(req.body, "end_time"),
          end_time ?? null,
          Object.hasOwn(req.body, "registration_deadline"),
          registration_deadline ?? null,
          Object.hasOwn(req.body, "capacity"),
          capacity ?? null,
          Object.hasOwn(req.body, "poster_url"),
          poster_url ?? null,
          Object.hasOwn(req.body, "poster_alt_text"),
          poster_alt_text ?? null,
          req.params.id,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Event not found.",
        });
      }

      return res.json({
        success: true,
        message: "Event updated successfully.",
        event: result.rows[0],
      });
    } catch (error) {
      if (handleInvalidId(error, res)) return;

      if (error.code === "23514") {
        return res.status(400).json({
          message: "Check the event dates and capacity.",
        });
      }

      console.error("Update event error:", error.message);

      return res.status(500).json({
        message: "Unable to update the event.",
      });
    }
  }
);

/* =========================
   DELETE EVENT
========================= */

router.delete("/:id", requirePermission("events.manage"), async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE FROM events
       WHERE id = $1
       RETURNING id, title`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.json({
      success: true,
      message: "Event deleted successfully.",
      event: result.rows[0],
    });
  } catch (error) {
    if (handleInvalidId(error, res)) return;

    console.error("Delete event error:", error.message);

    return res.status(500).json({
      message: "Unable to delete the event.",
    });
  }
});

/* =========================
   PUBLISH EVENT
========================= */

router.patch("/:id/publish", requirePermission("events.manage"), async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE events
       SET is_published = TRUE,
           updated_at = NOW()
       WHERE id = $1
       RETURNING id, title, is_published`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.json({
      success: true,
      message: "Event published successfully.",
      event: result.rows[0],
    });
  } catch (error) {
    if (handleInvalidId(error, res)) return;

    console.error("Publish event error:", error.message);

    return res.status(500).json({
      message: "Unable to publish the event.",
    });
  }
});

/* =========================
   UNPUBLISH EVENT
========================= */

router.patch("/:id/unpublish", requirePermission("events.manage"), async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE events
       SET is_published = FALSE,
           updated_at = NOW()
       WHERE id = $1
       RETURNING id, title, is_published`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.json({
      success: true,
      message: "Event unpublished successfully.",
      event: result.rows[0],
    });
  } catch (error) {
    if (handleInvalidId(error, res)) return;

    console.error("Unpublish event error:", error.message);

    return res.status(500).json({
      message: "Unable to unpublish the event.",
    });
  }
});

export default router;
