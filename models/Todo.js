// import mongoose
const mongoose = require("mongoose");

// schema for Todo that gives it structure (can be thought of as a constructor)
// maps through MongoDB collection to give documents said structure
const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  // id unique to a specific user
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
