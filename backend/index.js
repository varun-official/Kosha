/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes/Routes");
const DbConnect = require("./Database");

const PORT = process.env.PORT || 5000;
DbConnect();
const app = express();

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server Runing on ${PORT}`);
});
