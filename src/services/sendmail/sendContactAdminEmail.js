// src/services/mailServices/sendContactAdminEmail.js
import axios from "axios";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export async function sendContactAdminEmail(data) {
  try {
    const payload = {
      sender: { name: "resuInstant", email: process.env.EMAIL },
      to: [{ email: process.env.EMAIL }],
      subject: "New Contact Message - resuInstant",
      htmlContent: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Message:</b><br/>${data.message}</p>
      `,
    };

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log("CONTACT ADMIN EMAIL SENT:", response.data.messageId);
    return response.data;
  } catch (error) {
    console.error("Contact admin email failed:", error.response?.data || error.message);
    throw error;
  }
}
