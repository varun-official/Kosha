/** @format */
const Room = require("../models/Room-model");
class RoomService {
  async create({ topic, roomType, ownerId }) {
    const room = await Room.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  }

  async allRooms(types) {
    const rooms = await Room.find({ roomType: { $in: types } })
      .populate("speakers")
      .populate("ownerId")
      .exec();
    return rooms;
  }
}

module.exports = new RoomService();
