const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  tweetsId: {
    type: String,
    require: true
  },
  postsOwner: {
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
  comment: {
    type: String,
    require: true
  },

  date: {
    type: Date,

    default: Date.now
  }
});

module.exports = mongoose.model("commentModels", commentSchema);
