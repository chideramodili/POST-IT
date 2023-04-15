const mongoose = require("mongoose");

const user = mongoose.Schema({
  userName: { type: String, required: true },
  email: {
    type: String,
    required: true
  },
  isDeleted: Boolean,
  password: { required: true, type: String },
  // user: { type: String, required: true },
  date: {
    type: Date,

    default: Date.now
  }
});

module.exports = mongoose.model("users", user);
// const User = mongoose.model("users", user);
// exports.User = User;
