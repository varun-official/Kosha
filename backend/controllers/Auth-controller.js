/** @format */
const OtpService = require("../services/Otp-service");
const HashService = require("../services/Hash-service");
const UserService = require("../services/User-service");
const TokenService = require("../services/Token-service");
const UserDto = require("../dtos/User-dto");

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
      // TODO: sendotp by sms disabled
      // await OtpService.sendOtpBySms(phone, otp);
      res.status(200).json({
        hash: `${hashOtp}.${validTill}`,
        phone: phone,
        otp,
      });
    } catch (error) {
      res.status(500).json({ message: "Unable to send OTP" });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;

    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All required fields are required" });
    }

    const [hashOtp, validTill] = hash.split(".");

    if (Date.now > +validTill) {
      res.status(400).json({ message: "OTP expired!" });
    }

    const data = `${phone}.${otp}.${validTill}`;

    const isValid = OtpService.verifyOtp(data, hashOtp);

    if (!isValid) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await UserService.findUser({ phone: phone });
      if (!user) {
        user = await UserService.createUser({ phone: phone });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "DB error" });
    }

    const { accessToken, refreshToken } = await TokenService.generateToken({
      _id: user._id,
      activated: false,
    });

    await TokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);

    res.json({ auth: true, user: userDto });
  }
}

module.exports = new AuthController();
