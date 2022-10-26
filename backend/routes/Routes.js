/** @format */

const express = require("express");
const router = express.Router();
const authContoller = require("../controllers/Auth-controller");

router.post("/api/send-otp", authContoller.sendOtp);

module.exports = router;
