/** @format */
const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/RefreshToken-model");
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
      const refreshTokenObject = new refreshTokenModel({ token, userId });
      const savedToken = await refreshTokenObject.save();
    } catch (err) {
      console.log(err);
    }
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
  }

  async findRefreshToken(userId, refreshToken) {
    const token = await refreshTokenModel.findOne({
      token: refreshToken,
      userId: userId,
    });
    return token;
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refreshTokenModel.updateOne(
      { userId: userId },
      { token: refreshToken }
    );
  }

  async removeToken(refreshToken) {
    return await refreshTokenModel.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();
