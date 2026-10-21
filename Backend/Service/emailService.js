
import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, verificationUrl) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing from .env");
  }

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: [email],
    subject: "Verify your church website email",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Verify your email address</h2>
        <p>Thank you for registering with our church community.</p>
        <p>Click the button below to verify your email address.</p>
        <p>
          <a href="${verificationUrl}"
             style="display:inline-block;padding:12px 20px;
                    background:#3154A5;color:#ffffff;
                    text-decoration:none;border-radius:6px;">
            Verify my email
          </a>
        </p>
        <p>This link expires in 15 minutes and can only be used once.</p>
        <p>If you did not create this account, you can ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Email provider error:", error.message);
    throw new Error("Unable to send the verification email.");
  }

  return data;
}
