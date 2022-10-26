/** @format */
const OtpService = require("../services/Otp-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone no required" });
    }

    const otp = OtpService.generateOtp();

    res.status(200).json({ otp: otp });
  }
}

module.exports = new AuthController();
