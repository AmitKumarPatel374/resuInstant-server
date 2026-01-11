import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getUserResumesController,
  createResumeController,
  deleteResumeController,
  getUserResumeByIdController,
  getResumeByPublicId,
  updateResumeController,
} from "../controllers/resume.controller.js";
import uploads from "../config/multer.js";

const router = express.Router();

router.get("/data", authMiddleware, getUserResumesController);
router.post("/create", authMiddleware, createResumeController);
router.delete("/delete/:resumeId", authMiddleware, deleteResumeController);
router.get("/get/:resumeId", authMiddleware, getUserResumeByIdController);
router.get("/get/public/:resumeId", authMiddleware, getResumeByPublicId);
router.put(
  "/update",
  authMiddleware,
  uploads.single("image"),
  updateResumeController
);

export default router;
