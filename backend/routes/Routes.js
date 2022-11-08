/** @format */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth-controller");
const activateController = require("../controllers/Activate-controller");
const AuthMiddleware = require("../middlewares/Auth-middleware");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", AuthMiddleware, activateController.activate);
router.post("/api/refresh", activateController.refresh)

module.exports = router;
