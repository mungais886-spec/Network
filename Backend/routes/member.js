
import { Router } from "express";
import pool from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/member/profile
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, phone,
              role, phone_verified, created_at
       FROM members
       WHERE id = $1`,
      [req.session.member.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Member profile not found.",
      });
    }

    return res.json({
      member: result.rows[0],
    });
  } catch (error) {
    console.error("Profile error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve your profile.",
    });
  }
});

export default router;
