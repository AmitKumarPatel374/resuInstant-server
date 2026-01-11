import axios from "axios";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_API_KEY = process.env.BREVO_API_KEY;

export async function sendForgotPasswordLinkEmail({
  email,
  userName,
  resetLink,
}) {
  try {
    const payload = {
      sender: {
        name: "resuInstant",
        email: process.env.EMAIL,
      },
      to: [
        {
          email,
          name: userName || "User",
        },
      ],
      subject: "Reset Your resuInstant Password 🔐",
      htmlContent: `
        <div style="font-family: Inter, Arial, sans-serif; background:#ffffff; padding:40px;">
          
          <h2 style="color:#111;">Reset Your Password</h2>

          <p style="font-size:16px; color:#444;">
            Hi ${userName || "there"},
          </p>

          <p style="font-size:16px; color:#444;">
            We received a request to reset your <b>resuInstant</b> account password.
            Click the button below to set a new password.
          </p>

          <div style="margin:30px 0;">
            <a
              href="${resetLink}"
              style="
                background:#22c55e;
                color:#ffffff;
                padding:12px 24px;
                border-radius:9999px;
                text-decoration:none;
                font-weight:500;
                display:inline-block;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="font-size:14px; color:#666;">
            This link will expire in <b>15 minutes</b>.
          </p>

          <p style="font-size:14px; color:#777; margin-top:20px;">
            If you didn’t request a password reset, you can safely ignore this email.
          </p>

          <hr style="margin:30px 0;" />

          <p style="font-size:14px; color:#777;">
            — Team <b>resuInstant</b><br/>
            Build resumes faster & smarter 🚀
          </p>
        </div>
      `,
    };

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log("🔐 FORGOT PASSWORD LINK EMAIL SENT:", response.data.messageId);
    return response.data;

  } catch (error) {
    console.error(
      "Forgot password link email failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}
