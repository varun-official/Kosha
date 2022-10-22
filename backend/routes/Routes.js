/** @format */

const express = require("express");
const router = express.Router();
const { auth } = require("../controllers/Auth-controller");

router.post("/api/send-otp", auth);

module.exports = router;
