const express = require("express");
const { contactMailController } = require("../controllers/contact.controller");

const router = express.Router();


router.post("/me",contactMailController);

module.exports = router;