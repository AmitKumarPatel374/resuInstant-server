import { emailQueue } from "../queues/emailQueue.js";

export const contactMailController = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      })
    }

    // 🔥 Email job add
  await emailQueue.add("contact-email", {
    name,
    email,
    message,
  });
    
    return res.status(200).json({
      message: "Thanks for contacting us! We'll get back to you soon.",
    })
  } catch (error) {
    console.error("Contact mail error:", error)
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    })
  }
}

