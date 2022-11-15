/** @format */
const Jimp = require("jimp");
const path = require("path");
const userDto = require("../dtos/User-dto");
const UserService = require("../services/User-service");

class activateController {
  async activate(req, res) {
    const { name, avatar } = req.body;

    if (!name || !avatar) {
      res.status(400).json({ message: "All fields are required" });
    }

    //Image base64 to Buffer based
    // const [conversionType, base64Image] = avatar.split(",");
    // console.log(base64Image);
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}+${Math.round(Math.random() * 1e9)}.png`;
    try {
      const jimpRes = await Jimp.read(buffer);
      jimpRes
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (error) {
      res.status(500).json({ message: "Could not process the Image" });
    }

    const userId = req.user._id;

    try {
      const user = await UserService.findUser({ _id: userId });

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();

      res.json({ user: new userDto(user), auth: true });
    } catch (error) {
      res.status(500).json({ message: "Someting went wrong on DB" });
    }
  }
}

module.exports = new activateController();
