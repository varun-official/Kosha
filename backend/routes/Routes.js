/** @format */

const express = require("express");
const router = express.Router();
const authContoller = require("../controllers/Auth-controller");

router.post("/api/send-otp", authContoller.sendOtp);
router.post("api/verify-otp", authContoller.verifyOtp);

module.exports = router;
