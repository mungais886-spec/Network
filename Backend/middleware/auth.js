
import pool from "../db.js";

// Check whether a member is logged in.
export function requireAuth(req, res, next) {
  if (!req.session?.member?.id) {
    return res.status(401).json({
      message: "Please log in to access this resource.",
    });
  }

  next();
}

// Check whether the logged-in member is an administrator.
export async function requireAdmin(req, res, next) {
  if (!req.session?.member?.id) {
    return res.status(401).json({
      message: "Please log in first.",
    });
  }

  try {
    // Read the current role from PostgreSQL.
    // This avoids trusting an outdated role in the session.
    const result = await pool.query(
      "SELECT role FROM members WHERE id = $1",
      [req.session.member.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Account not found.",
      });
    }

    if (result.rows[0].role !== "admin") {
      return res.status(403).json({
        message: "Administrator access required.",
      });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error.message);

    return res.status(500).json({
      message: "Unable to verify permissions.",
    });
  }
}
