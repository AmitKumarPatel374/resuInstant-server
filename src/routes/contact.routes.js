import express from "express";
import { contactMailController } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/me", contactMailController);

export default router;
