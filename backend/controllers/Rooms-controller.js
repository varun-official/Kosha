/** @format */

const RoomService = require("../services/Rooms-service");
const RoomDto = require("../dtos/Room-dto");

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

    return res.json(new RoomDto(room));
  }
}

module.exports = new RoomsController();
