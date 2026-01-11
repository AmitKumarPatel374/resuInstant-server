import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addFeedbackController,
  getAllFeedbackController,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addFeedbackController);
router.get("/data", getAllFeedbackController);

export default router;
