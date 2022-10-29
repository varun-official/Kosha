/** @format */

const mongoose = require("mongoose");

function DbConnect() {
  const DB_URL = process.env.MONGODB_URL;
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    .then(() => {
      console.log("DB Connection established");
    });
}

module.exports = DbConnect;
