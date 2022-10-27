/** @format */

const crypto = require("crypto");

class HashService {
  async hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.SALT)
      .update(data)
      .digest("hex");
  }
}

module.exports = new HashService();
