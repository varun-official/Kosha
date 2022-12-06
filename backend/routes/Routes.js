/** @format */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth-controller");
const activateController = require("../controllers/Activate-controller");
const AuthMiddleware = require("../middlewares/Auth-middleware");
const roomsController = require("../controllers/Rooms-controller");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", AuthMiddleware, activateController.activate);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", AuthMiddleware, authController.logout);
router.post("/api/rooms", AuthMiddleware, roomsController.createRoom);

module.exports = router;
