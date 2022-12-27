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
io.on("connection", (socket) => {
  console.log("new connection", socket.id);
});

server.listen(PORT, () => {
  console.log(`Server Runing on ${PORT}`);
});
