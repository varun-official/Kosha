/** @format */

require("dotenv").config();
const express = require("express");

const routes = require("./routes/Routes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server Runing on ${PORT}`);
});