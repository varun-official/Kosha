/** @format */

const User = require("../models/User-model");

class UserService {
  async findUser(filter) {
    const user = await User.findOne(filter);
    return user;
  }

  async createUser(data) {
    const user = new User(data);
    const savedUser = await user.save();
    return savedUser;
  }
}

module.exports = new UserService();
