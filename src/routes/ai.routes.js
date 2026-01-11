import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  enhanceProfessionalSummaryController,
  enhanceJobDescriptionController,
  uploadResumeController,
  enhanceFeedbackMessageController,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.post(
  "/enhance-pro-sum",
  authMiddleware,
  enhanceProfessionalSummaryController
);

router.post(
  "/enhance-job-desc",
  authMiddleware,
  enhanceJobDescriptionController
);

router.post(
  "/upload-resume",
  authMiddleware,
  uploadResumeController
);

router.post(
  "/feedback",
  enhanceFeedbackMessageController
);

export default router;
