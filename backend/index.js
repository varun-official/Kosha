/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const routes = require("./routes/Routes");
const DbConnect = require("./Database");
const ACTIONS = require("./actions");

const PORT = process.env.PORT || 5000;
DbConnect();

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use("/storage", express.static("storage"));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "8mb" }));
app.use(routes);

//socket logic
const socketUserMapping = {};
io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;
    //Get all the user of that room from socket
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {});
    });
    socket.emit(ACTIONS.ADD_PEER);
    socket.join(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Server Runing on ${PORT}`);
});
