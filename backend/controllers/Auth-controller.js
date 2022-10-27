/** @format */
const OtpService = require("../services/Otp-service");
const HashService = require("../services/Hash-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone no required" });
    }

    const otp = await OtpService.generateOtp();

    const ttl = 1000 * 60 * 2;
    const validTill = Date.now() + ttl;
    const data = `${phone}.${otp}.${validTill}`;

    const hashOtp = await HashService.hashOtp(data);

    try {
      await OtpService.sendOtpBySms(phone, otp);
      res.status(200).json({
        hash: `${hashOtp}.${validTill}`,
        phone: phone,
      });
    } catch (error) {
      res.status(500).json({ message: "Unable to send OTP" });
    }
  }
}

module.exports = new AuthController();
