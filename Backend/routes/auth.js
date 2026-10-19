
import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import pool from "../db.js";

const router = Router();

// POST /api/auth/register
router.post(
  "/register",
  [
    body("full_name")
      .isString()
      .withMessage("Full name must be text.")
      .bail()
      .trim()
      .isLength({ min: 2, max: 150 })
      .withMessage("Full name must be between 2 and 150 characters."),

    body("email")
      .isEmail()
      .withMessage("Enter a valid email address.")
      .normalizeEmail(),

    body("phone")
      .isString()
      .withMessage("Phone number must be text.")
      .bail()
      .trim()
      .matches(/^\+[1-9]\d{7,14}$/)
      .withMessage(
        "Enter your phone number in international format, e.g. +254712345678."
      ),

    body("password")
      .isString()
      .withMessage("Password must be text.")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters.")
      .bail()
      .custom((value) => Buffer.byteLength(value, "utf8") <= 72)
      .withMessage("Password must not exceed 72 bytes.")
  ],
  async (req, res) => {
    // Step 1: Check the validation results.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Please correct the submitted information.",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    // Step 2: Get the validated information.
    const { full_name, email, phone, password } = req.body;

    try {
      // Step 3: Hash the password before saving it.
      const passwordHash = await bcrypt.hash(password, 12);

      // Step 4: Save the new member in PostgreSQL.
      const result = await pool.query(
        `INSERT INTO members
          (full_name, email, phone, password_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING id, full_name, email, phone,
                   role, phone_verified, created_at`,
        [full_name.trim(), email.toLowerCase(), phone.trim(), passwordHash]
      );

      // Step 5: Return the safe account details.
      return res.status(201).json({
        message: "Account created successfully. Phone verification is still required.",
        member: result.rows[0],
      });
    } catch (error) {
      // PostgreSQL error 23505 means a UNIQUE constraint was violated.
      if (error.code === "23505") {
        return res.status(409).json({
          message: "That email address or phone number is already registered.",
        });
      }

      console.error("Registration error:", error.message);

      return res.status(500).json({
        message: "Unable to create your account right now.",
      });
    }
  }
);


router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email address.")
      .normalizeEmail(),

    body("password")
      .isString()
      .withMessage("Password is required.")
      .bail()
      .notEmpty()
      .withMessage("Password is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Please check your login details.",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    const { email, password } = req.body;

    try {
      // Find the account by email.
      const result = await pool.query(
        `SELECT id, full_name, email, phone,
                password_hash, role, phone_verified
         FROM members
         WHERE email = $1
         LIMIT 1`,
        [email]
      );

      const member = result.rows[0];

      // Use the same response for unknown emails and wrong passwords.
      if (!member || !(await bcrypt.compare(password, member.password_hash))) {
        return res.status(401).json({
          message: "Invalid email or password.",
        });
      }

      // Require phone verification before allowing login.
      if (!member.phone_verified) {
        return res.status(403).json({
          message: "Please verify your phone number before logging in.",
          code: "PHONE_VERIFICATION_REQUIRED",
        });
      }

      // Regenerate the session ID after successful authentication.
      await new Promise((resolve, reject) => {
        req.session.regenerate((error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      // Store only safe member information in the session.
      req.session.member = {
        id: member.id,
        full_name: member.full_name,
        email: member.email,
        role: member.role,
      };

      // Ensure the session is saved before responding.
      await new Promise((resolve, reject) => {
        req.session.save((error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      return res.status(200).json({
        message: "Login successful.",
        member: req.session.member,
      });
    } catch (error) {
      console.error("Login error:", error.message);

      return res.status(500).json({
        message: "Unable to log in right now.",
      });
    }
  }
);


router.get("/me", (req, res) => {
  if (!req.session.member) {
    return res.status(401).json({
      message: "You are not logged in.",
    });
  }

  return res.status(200).json({
    member: req.session.member,
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error.message);

      return res.status(500).json({
        message: "Unable to log out right now.",
      });
    }

    res.clearCookie("church.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Logged out successfully.",
    });
  });
});


export default router;
