/** @format */

const crypto = require("crypto");

class OtpService {
  generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }
}

module.exports = new OtpService();
