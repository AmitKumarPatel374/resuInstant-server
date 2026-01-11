import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Database & Redis
import connectDB from "./src/config/database/db.js";
import cacheInstance from "./src/services/cache.service.js";

// Routes
import authRoutes from "./src/routes/auth.routes.js";
import resumeRoutes from "./src/routes/resume.routes.js";
import aiRoutes from "./src/routes/ai.routes.js";
import feedbackRoutes from "./src/routes/feedback.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";

// 🔥 IMPORTANT: Email Worker auto-run
import "./src/workers/emailWorker.js";

const app = express();

// DB connect
connectDB();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_ORIGIN,
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Redis status
cacheInstance.on("connect", () => {
  console.log("Redis connected successfully");
});

// Routes
app.get("/", (req, res) => res.send("Server is live..."));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
