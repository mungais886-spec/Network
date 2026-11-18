
import pool from "../db.js";

export function requireAuth(req, res, next) {
  if (!req.session?.member?.id) {
    return res.status(401).json({
      message: "Please log in to access this resource.",
    });
  }

  next();
}

export async function requireAdmin(req, res, next) {
  if (!req.session?.member?.id) {
    return res.status(401).json({
      message: "Please log in first.",
    });
  }

  try {
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

export function requirePermission(permissionKey) {
  return async (req, res, next) => {
    if (!req.session?.member?.id) {
      return res.status(401).json({
        message: "Please log in first.",
      });
    }

    if (
      typeof permissionKey !== "string" ||
      !permissionKey.trim()
    ) {
      return res.status(500).json({
        message: "Invalid permission configuration.",
      });
    }

    try {
      const memberResult = await pool.query(
        "SELECT role FROM members WHERE id = $1",
        [req.session.member.id]
      );

      if (memberResult.rows.length === 0) {
        return res.status(401).json({
          message: "Account not found.",
        });
      }

      const { role } = memberResult.rows[0];

      if (role === "admin") {
        return next();
      }

      if (role !== "leader") {
        return res.status(403).json({
          message: "You do not have permission to perform this action.",
        });
      }

      const permissionResult = await pool.query(
        `SELECT 1
         FROM member_permissions mp
         INNER JOIN permissions p
           ON p.id = mp.permission_id
         WHERE mp.member_id = $1
           AND p.permission_key = $2
         LIMIT 1`,
        [req.session.member.id, permissionKey]
      );

      if (permissionResult.rows.length === 0) {
        return res.status(403).json({
          message: "You do not have the required permission.",
        });
      }

      return next();
    } catch (error) {
      console.error("Permission verification error:", error.message);

      return res.status(500).json({
        message: "Unable to verify permissions.",
      });
    }
  };
}
