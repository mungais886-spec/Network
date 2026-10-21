
import { Router } from "express";
import { body, validationResult } from "express-validator";
import pool from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// GET /api/events
// Public visitors can see published events.
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, description, location,
              start_time, end_time, registration_deadline,
              capacity, created_at
       FROM events
       WHERE is_published = TRUE
       ORDER BY start_time ASC`
    );

    return res.json({ events: result.rows });
  } catch (error) {
    console.error("Fetch events error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve events.",
    });
  }
});

// GET /api/events/:id
// Public visitors can view a single published event.
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, description, location,
              start_time, end_time, registration_deadline,
              capacity, created_at
       FROM events
       WHERE id = $1 AND is_published = TRUE`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.json({ event: result.rows[0] });
  } catch (error) {
    if (error.code === "22P02") {
      return res.status(400).json({
        message: "Invalid event ID.",
      });
    }

    console.error("Fetch event error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve the event.",
    });
  }
});

// POST /api/events
// Only administrators can create events.
router.post(
  "/",
  requireAdmin,
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
      .isString()
      .withMessage("Description must be text."),

    body("location")
      .optional({ nullable: true })
      .isString()
      .withMessage("Location must be text.")
      .bail()
      .isLength({ max: 250 })
      .withMessage("Location must not exceed 250 characters."),

    body("start_time")
      .isISO8601()
      .withMessage("Provide a valid event start date and time."),

    body("end_time")
      .optional({ nullable: true })
      .isISO8601()
      .withMessage("Provide a valid event end date and time."),

    body("registration_deadline")
      .optional({ nullable: true })
      .isISO8601()
      .withMessage("Provide a valid registration deadline."),

    body("capacity")
      .optional({ nullable: true })
      .isInt({ min: 1 })
      .withMessage("Capacity must be a positive whole number.")
      .toInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Please correct the event information.",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    const {
      title,
      description = null,
      location = null,
      start_time,
      end_time = null,
      registration_deadline = null,
      capacity = null,
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
          created_by
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, title, description, location,
                  start_time, end_time, registration_deadline,
                  capacity, is_published, created_at`,
        [
          title.trim(),
          description,
          location,
          start_time,
          end_time,
          registration_deadline,
          capacity,
          req.session.member.id,
        ]
      );

      return res.status(201).json({
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


router.put(
  "/:id",
  requireAdmin,
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
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid event information.",
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      location,
      start_time,
      end_time,
      registration_deadline,
      capacity,
    } = req.body;

    try {
      const result = await pool.query(
        `UPDATE events
         SET title = COALESCE($1, title),
             description = CASE WHEN $2::boolean THEN $3 ELSE description END,
             location = CASE WHEN $4::boolean THEN $5 ELSE location END,
             start_time = COALESCE($6, start_time),
             end_time = CASE WHEN $7::boolean THEN $8 ELSE end_time END,
             registration_deadline =
               CASE WHEN $9::boolean THEN $10 ELSE registration_deadline END,
             capacity = CASE WHEN $11::boolean THEN $12 ELSE capacity END,
             updated_at = NOW()
         WHERE id = $13
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
          req.params.id,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Event not found.",
        });
      }

      return res.json({
        message: "Event updated successfully.",
        event: result.rows[0],
      });
    } catch (error) {
      if (error.code === "22P02") {
        return res.status(400).json({
          message: "Invalid event ID or field value.",
        });
      }

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

router.patch("/:id/publish", requireAdmin, async (req, res) => {
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
      message: "Event published successfully.",
      event: result.rows[0],
    });
  } catch (error) {
    if (error.code === "22P02") {
      return res.status(400).json({
        message: "Invalid event ID.",
      });
    }

    console.error("Publish event error:", error.message);

    return res.status(500).json({
      message: "Unable to publish the event.",
    });
  }
});


router.patch("/:id/unpublish", requireAdmin, async (req, res) => {
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
      message: "Event unpublished successfully.",
      event: result.rows[0],
    });
  } catch (error) {
    if (error.code === "22P02") {
      return res.status(400).json({
        message: "Invalid event ID.",
      });
    }

    console.error("Unpublish event error:", error.message);

    return res.status(500).json({
      message: "Unable to unpublish the event.",
    });
  }
});


export default router;
