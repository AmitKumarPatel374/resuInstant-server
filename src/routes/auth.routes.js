const express = require("express");
const { registerController, loginController, getUserById, logoutController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);
router.get("/data",authMiddleware,getUserById );
router.delete("/logout",authMiddleware, logoutController);

module.exports = router;