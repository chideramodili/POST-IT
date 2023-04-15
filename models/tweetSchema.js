const mongoose = require("mongoose");

const tweetsScheme = mongoose.Schema({
  tweets: {
    type: String,
    require: true
  },
  userName: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,

    default: Date.now
  }
});

module.exports = mongoose.model("tweetSchema", tweetsScheme);
