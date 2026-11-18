
import { Router } from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import pool from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

const allowedPermissions = [
  "events.manage",
  "devotionals.manage",
];

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

const handlePhotoUpload = (req, res, next) => {
  upload.single("photo")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        message: error.message || "Unable to upload profile photo.",
      });
    }

    next();
  });
};

router.get("/profile", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, phone, role,
              phone_verified, email_verified, created_at,
              bio, location, department, year_of_study,
              profile_image_updated_at
       FROM members
       WHERE id = $1`,
      [req.session.member.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Member profile not found.",
      });
    }

    const member = result.rows[0];

    return res.json({
      member: {
        ...member,
        profile_image_url: member.profile_image_updated_at
          ? "/api/member/profile/photo"
          : null,
      },
    });
  } catch (error) {
    console.error("Profile error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve your profile.",
    });
  }
});

router.put("/profile", requireAuth, async (req, res) => {
  const {
    full_name,
    phone,
    bio,
    location,
    department,
    year_of_study,
  } = req.body;

  const fullName = typeof full_name === "string"
    ? full_name.trim()
    : "";

  const phoneNumber = typeof phone === "string"
    ? phone.trim()
    : "";

  const profileBio = typeof bio === "string" ? bio.trim() : "";
  const profileLocation = typeof location === "string"
    ? location.trim()
    : "";
  const profileDepartment = typeof department === "string"
    ? department.trim()
    : "";
  const yearOfStudy = typeof year_of_study === "string"
    ? year_of_study.trim()
    : "";

  if (fullName.length < 2 || fullName.length > 150) {
    return res.status(400).json({
      message: "Name must contain between 2 and 150 characters.",
    });
  }

  if (!/^\+?[1-9]\d{7,14}$/.test(phoneNumber)) {
    return res.status(400).json({
      message: "Please provide a valid international phone number.",
    });
  }

  if (profileBio.length > 1000) {
    return res.status(400).json({
      message: "Biography cannot exceed 1000 characters.",
    });
  }

  if (profileLocation.length > 150) {
    return res.status(400).json({
      message: "Location cannot exceed 150 characters.",
    });
  }

  if (profileDepartment.length > 150) {
    return res.status(400).json({
      message: "Department cannot exceed 150 characters.",
    });
  }

  if (yearOfStudy.length > 30) {
    return res.status(400).json({
      message: "Year of study cannot exceed 30 characters.",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE members
       SET full_name = $1,
           phone = $2,
           bio = $3,
           location = $4,
           department = $5,
           year_of_study = $6,
           updated_at = NOW()
       WHERE id = $7
       RETURNING id, full_name, email, phone, role,
                 bio, location, department, year_of_study`,
      [
        fullName,
        phoneNumber,
        profileBio || null,
        profileLocation || null,
        profileDepartment || null,
        yearOfStudy || null,
        req.session.member.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Member profile not found.",
      });
    }

    req.session.member.full_name = result.rows[0].full_name;

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      member: result.rows[0],
    });
  } catch (error) {
    console.error("Profile update error:", error.message);

    return res.status(500).json({
      message: "Unable to update your profile.",
    });
  }
});

router.post(
  "/profile/photo",
  requireAuth,
  handlePhotoUpload,
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a profile photo.",
      });
    }

    try {
      await pool.query(
        `UPDATE members
         SET profile_image_data = $1,
             profile_image_mime_type = $2,
             profile_image_updated_at = NOW(),
             updated_at = NOW()
         WHERE id = $3`,
        [
          req.file.buffer,
          req.file.mimetype,
          req.session.member.id,
        ]
      );

      return res.json({
        success: true,
        message: "Profile photo uploaded successfully.",
        profile_image_url: "/api/member/profile/photo",
      });
    } catch (error) {
      console.error("Profile photo upload error:", error.message);

      return res.status(500).json({
        message: "Unable to save your profile photo.",
      });
    }
  }
);

router.get("/profile/photo", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT profile_image_data, profile_image_mime_type
       FROM members
       WHERE id = $1`,
      [req.session.member.id]
    );

    if (
      result.rows.length === 0 ||
      !result.rows[0].profile_image_data
    ) {
      return res.status(404).json({
        message: "No profile photo found.",
      });
    }

    res.set("Content-Type", result.rows[0].profile_image_mime_type);
    res.set("Cache-Control", "private, no-cache");
    res.set("X-Content-Type-Options", "nosniff");

    return res.send(result.rows[0].profile_image_data);
  } catch (error) {
    console.error("Profile photo retrieval error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve your profile photo.",
    });
  }
});

router.delete("/profile/photo", requireAuth, async (req, res) => {
  try {
    await pool.query(
      `UPDATE members
       SET profile_image_data = NULL,
           profile_image_mime_type = NULL,
           profile_image_updated_at = NULL,
           updated_at = NOW()
       WHERE id = $1`,
      [req.session.member.id]
    );

    return res.json({
      success: true,
      message: "Profile photo removed successfully.",
    });
  } catch (error) {
    console.error("Profile photo deletion error:", error.message);

    return res.status(500).json({
      message: "Unable to remove your profile photo.",
    });
  }
});

router.put("/profile/password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (
    typeof currentPassword !== "string" ||
    typeof newPassword !== "string"
  ) {
    return res.status(400).json({
      message: "Current password and new password are required.",
    });
  }

  if (
    newPassword.length < 8 ||
    Buffer.byteLength(newPassword, "utf8") > 72
  ) {
    return res.status(400).json({
      message: "New password must contain at least 8 characters and cannot exceed 72 bytes.",
    });
  }

  try {
    const memberResult = await pool.query(
      `SELECT password_hash
       FROM members
       WHERE id = $1`,
      [req.session.member.id]
    );

    if (memberResult.rows.length === 0) {
      return res.status(404).json({
        message: "Account not found.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      memberResult.rows[0].password_hash
    );

    if (!passwordMatches) {
      return res.status(400).json({
        message: "Your current password is incorrect.",
      });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    await pool.query(
      `UPDATE members
       SET password_hash = $1,
           updated_at = NOW()
       WHERE id = $2`,
      [newPasswordHash, req.session.member.id]
    );

    return res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Password update error:", error.message);

    return res.status(500).json({
      message: "Unable to change your password.",
    });
  }
});

router.get("/admin", requireAdmin, async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 20)
    );
    const offset = (page - 1) * limit;
    const search = String(req.query.search || "").trim().slice(0, 100);
    const searchTerm = `%${search}%`;

    const [membersResult, countResult] = await Promise.all([
      pool.query(
        `SELECT id, full_name, email, phone, role,
                phone_verified, email_verified, created_at
         FROM members
         WHERE (
           $1 = ''
           OR full_name ILIKE $2
           OR email ILIKE $2
           OR phone ILIKE $2
         )
         ORDER BY created_at DESC
         LIMIT $3 OFFSET $4`,
        [search, searchTerm, limit, offset]
      ),
      pool.query(
        `SELECT COUNT(*)::int AS total
         FROM members
         WHERE (
           $1 = ''
           OR full_name ILIKE $2
           OR email ILIKE $2
           OR phone ILIKE $2
         )`,
        [search, searchTerm]
      ),
    ]);

    const total = countResult.rows[0].total;

    return res.json({
      members: membersResult.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin member list error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve members.",
    });
  }
});

router.put("/admin/:id/access", requireAdmin, async (req, res) => {
  const { role, permissions } = req.body;

  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).json({
      message: "Invalid member ID.",
    });
  }

  if (!["member", "leader"].includes(role)) {
    return res.status(400).json({
      message: "Role must be either member or leader.",
    });
  }

  if (!Array.isArray(permissions)) {
    return res.status(400).json({
      message: "Permissions must be provided as an array.",
    });
  }

  if (
    permissions.some(
      (permission) =>
        typeof permission !== "string" ||
        !allowedPermissions.includes(permission)
    )
  ) {
    return res.status(400).json({
      message: "One or more permissions are invalid.",
    });
  }

  if (new Set(permissions).size !== permissions.length) {
    return res.status(400).json({
      message: "Duplicate permissions are not allowed.",
    });
  }

  if (role === "member" && permissions.length > 0) {
    return res.status(400).json({
      message: "Members cannot be assigned management permissions.",
    });
  }

  let client;

  try {
    client = await pool.connect();

    await client.query("BEGIN");

    const memberResult = await client.query(
      `SELECT id, full_name, email, role
       FROM members
       WHERE id = $1
       FOR UPDATE`,
      [req.params.id]
    );

    if (memberResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Member not found.",
      });
    }

    const member = memberResult.rows[0];

    if (member.role === "admin") {
      await client.query("ROLLBACK");

      return res.status(403).json({
        message: "Administrator accounts cannot be changed through this endpoint.",
      });
    }

    if (permissions.length > 0) {
      const permissionResult = await client.query(
        `SELECT permission_key
         FROM permissions
         WHERE permission_key = ANY($1::varchar[])`,
        [permissions]
      );

      if (permissionResult.rows.length !== permissions.length) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          message: "One or more permissions do not exist in the database.",
        });
      }
    }

    await client.query(
      `UPDATE members
       SET role = $1,
           updated_at = NOW()
       WHERE id = $2`,
      [role, req.params.id]
    );

    await client.query(
      `DELETE FROM member_permissions
       WHERE member_id = $1`,
      [req.params.id]
    );

    for (const permissionKey of permissions) {
      await client.query(
        `INSERT INTO member_permissions (
           member_id,
           permission_id,
           assigned_by
         )
         SELECT $1, id, $3
         FROM permissions
         WHERE permission_key = $2`,
        [
          req.params.id,
          permissionKey,
          req.session.member.id,
        ]
      );
    }

    await client.query("COMMIT");

    return res.json({
      success: true,
      message: "Member access updated successfully.",
      member: {
        id: member.id,
        full_name: member.full_name,
        email: member.email,
        role,
        permissions,
      },
    });
  } catch (error) {
    if (client) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error("Access update rollback error:", rollbackError.message);
      }
    }

    console.error("Member access update error:", error.message);

    return res.status(500).json({
      message: "Unable to update member access.",
    });
  } finally {
    client?.release();
  }
});

router.get("/admin/:id", requireAdmin, async (req, res) => {
  try {
    if (!/^\d+$/.test(req.params.id)) {
      return res.status(400).json({
        message: "Invalid member ID.",
      });
    }

    const result = await pool.query(
      `SELECT id, full_name, email, phone, role,
              phone_verified, email_verified, created_at, updated_at
       FROM members
       WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Member not found.",
      });
    }

    const permissionsResult = await pool.query(
      `SELECT p.permission_key
       FROM member_permissions mp
       JOIN permissions p ON p.id = mp.permission_id
       WHERE mp.member_id = $1
       ORDER BY p.permission_key`,
      [req.params.id]
    );

    return res.json({
      member: {
        ...result.rows[0],
        permissions: permissionsResult.rows.map(
          (permission) => permission.permission_key
        ),
      },
    });
  } catch (error) {
    console.error("Admin member details error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve member details.",
    });
  }
});

export default router;
