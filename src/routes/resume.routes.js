const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const {
  getUserResumesController,
  createResumeController,
  deleteResumeController,
  getUserResumeByIdController,
  getResumeByPublicId,
  updateResumeController,
} = require("../controllers/resume.controller")
const uploads = require("../config/multer")

const router = express.Router()

router.get("/data", authMiddleware, getUserResumesController)
router.post("/create", authMiddleware, createResumeController)
router.delete("/delete/:resumeId", authMiddleware, deleteResumeController)
router.get("/get/:resumeId", authMiddleware, getUserResumeByIdController)
router.get("/get/public/:resumeId", authMiddleware, getResumeByPublicId)
router.put("/update", authMiddleware, uploads.single("image"), updateResumeController)

module.exports = router
