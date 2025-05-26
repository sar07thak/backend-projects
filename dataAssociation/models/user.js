const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:37017/miniproject");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
