
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
      .withMessage("Enter your phone number in international format."),

    body("password")
      .isString()
      .withMessage("Password must be text.")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters.")
      .bail()
      .custom((value) => Buffer.byteLength(value, "utf8") <= 72)
      .withMessage("Password must not exceed 72 bytes."),
  ],
  async (req, res) => {
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

    const { full_name, email, phone, password } = req.body;

    try {
      const passwordHash = await bcrypt.hash(password, 12);

      const result = await pool.query(
        `INSERT INTO members
          (full_name, email, phone, password_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING id, full_name, email, phone, role, email_verified`,
        [
          full_name.trim(),
          email.toLowerCase(),
          phone.trim(),
          passwordHash,
        ]
      );

      const member = result.rows[0];

      // Generate a secure verification token.
      const token = randomBytes(32).toString("hex");

      // Store only the token's hash in PostgreSQL.
      const tokenHash = createHash("sha256")
        .update(token)
        .digest("hex");

      await pool.query(
        `INSERT INTO email_verifications
          (member_id, token_hash, expires_at)
         VALUES ($1, $2, NOW() + INTERVAL '15 minutes')`,
        [member.id, tokenHash]
      );

      // Build the link the member will open from their email.
      const verificationUrl =
        `${process.env.FRONTEND_URL}/verify-email` +
        `?token=${token}&email=${encodeURIComponent(member.email)}`;

      try {
        await sendVerificationEmail(member.email, verificationUrl);
      } catch (emailError) {
        console.error("Verification email could not be sent.");

        return res.status(502).json({
          message:
            "Your account was created, but the verification email could not be sent. Please try requesting a new verification email.",
          code: "EMAIL_SEND_FAILED",
        });
      }

      return res.status(201).json({
        message:
          "Account created successfully. Please check your email to verify your account.",
        member: {
          id: member.id,
          full_name: member.full_name,
          email: member.email,
          phone: member.phone,
          role: member.role,
          email_verified: member.email_verified,
        },
      });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          message:
            "That email address or phone number is already registered.",
        });
      }

      console.error("Registration error:", error.message);

      return res.status(500).json({
        message: "Unable to create your account right now.",
      });
    }
  }
);


/**
POST /api/auth/verify-email
  Verifies a member's email using the token sent by email.**/

  
router.post(
  "/verify-email",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email address.")
      .normalizeEmail(),

    body("token")
      .isString()
      .withMessage("Verification token is required.")
      .bail()
      .matches(/^[a-f0-9]{64}$/i)
      .withMessage("Invalid verification token."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "The verification link is invalid.",
      });
    }

    const { email, token } = req.body;

    const tokenHash = createHash("sha256")
      .update(token)
      .digest("hex");

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Lock the matching verification record to prevent reuse.
      const result = await client.query(
        `SELECT ev.id, ev.member_id
         FROM email_verifications ev
         JOIN members m ON m.id = ev.member_id
         WHERE m.email = $1
           AND ev.token_hash = $2
           AND ev.used_at IS NULL
           AND ev.expires_at > NOW()
         FOR UPDATE OF ev`,
        [email.toLowerCase(), tokenHash]
      );

      if (result.rowCount === 0) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          message:
            "This verification link is invalid, expired, or already used. Please request a new verification email.",
          code: "INVALID_OR_EXPIRED_TOKEN",
        });
      }

      const verification = result.rows[0];

      // Mark the token as used so it cannot verify another time.
      await client.query(
        `UPDATE email_verifications
         SET used_at = NOW()
         WHERE id = $1`,
        [verification.id]
      );

      // Activate the member's account.
      await client.query(
        `UPDATE members
         SET email_verified = TRUE,
             updated_at = NOW()
         WHERE id = $1`,
        [verification.member_id]
      );

      await client.query("COMMIT");

      return res.status(200).json({
        message:
          "Your email has been verified successfully. You can now sign in.",
      });
    } catch (error) {
      await client.query("ROLLBACK");

      console.error("Email verification error:", error.message);

      return res.status(500).json({
        message: "Unable to verify your email right now. Please try again.",
      });
    } finally {
      client.release();
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
