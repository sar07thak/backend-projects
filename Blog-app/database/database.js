const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  mongoose.connect(process.env.CONNECTION_STRING);
  console.log("DB is connected");
}

module.exports = main;
