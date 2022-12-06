/** @format */

const RoomService = require("../services/Rooms-service");

class RoomsController {
  async createRoom(req, res) {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const room = await RoomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });
  }
}

module.exports = new RoomsController();
