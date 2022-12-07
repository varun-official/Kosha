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
}

module.exports = new RoomService();
