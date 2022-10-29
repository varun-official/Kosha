/** @format */

const crypto = require("crypto");
const HashService = require("./Hash-service");

const SmsSid = process.env.SMS_SID;
const SmsAuthToken = process.env.SMS_AUTH_TOKEN;

const twilio = require("twilio")(SmsSid, SmsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendOtpBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_NUMBER,
      body: `Your Otp for login to the app Kosha is ${otp}`,
    });
  }

  async verifyOtp(data, hashOtp) {
    let computedHash = await HashService.hashOtp(data);
    return computedHash === hashOtp;
  }
}

module.exports = new OtpService();
