/** @format */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth-controller");
const activateController = require("../controllers/Activate-controller");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", activateController.activate);

module.exports = router;
