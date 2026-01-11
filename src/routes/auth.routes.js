import express from "express";
import {
  registerController,
  loginController,
  getUserById,
  logoutController,
  countUserController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/data", authMiddleware, getUserById);
router.delete("/logout", authMiddleware, logoutController);
router.get("/user/count", authMiddleware, countUserController);

export default router;
