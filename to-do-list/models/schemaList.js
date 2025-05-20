const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      unique : true 
    },
    description: {
      type: String,
      trim: true,
    },
    Completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const userTodo = mongoose.model("userTodo", todoSchema);
module.exports = userTodo;
