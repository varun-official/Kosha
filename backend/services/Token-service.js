/** @format */
const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/RefreshToken-model")
class TokenService {
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1y",
      }
    );

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      const refreshTokenObject = new refreshTokenModel({token, userId});
      const savedToken = await refreshTokenObject.save();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new TokenService();
