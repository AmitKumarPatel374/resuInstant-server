// src/services/mailServices/sendContactUserEmail.js
import axios from "axios";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export async function sendContactUserEmail(data) {
  try {
    const payload = {
      sender: { name: "resuInstant", email: process.env.EMAIL },
      to: [{ email: data.email, name: data.name }],
      subject: "Thanks for contacting resuInstant",
      htmlContent: `
        <h3>Hello ${data.name}, 👋</h3>
        <p>Thanks for contacting <b>resuInstant</b>.</p>
        <p>Our team will get back to you soon.</p>
      `,
    };

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log("CONTACT USER EMAIL SENT:", response.data.messageId);
    return response.data;
  } catch (error) {
    console.error("Contact user email failed:", error.response?.data || error.message);
    throw error;
  }
}
