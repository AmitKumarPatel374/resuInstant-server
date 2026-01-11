import "dotenv/config";
console.log("REDIS HOST:", process.env.REDIS_HOST);
console.log("REDIS PORT:", process.env.REDIS_PORT);
console.log("REDIS PASSWORD EXISTS:", !!process.env.REDIS_PASSWORD);
import { Worker } from "bullmq";
import connection from "../config/bullmq-connection.js";
import { sendContactAdminEmail } from "../services/sendmail/sendContactAdminEmail.js";
import { sendContactUserEmail } from "../services/sendmail/sendContactUserEmail.js";

new Worker(
  "email-queue",
  async (job) => {
    if (job.name === "contact-email") {
      await sendContactAdminEmail(job.data);
      await sendContactUserEmail(job.data);
    }
  },
  { connection, concurrency: 3 }
);

console.log("📨 Resume-Builder Email Worker running");
