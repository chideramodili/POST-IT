const mongoose = require("mongoose");
const logger = require("pino")();
const dotenv = require("dotenv");
const user = require("../models/users");
const post = require("../models/tweetSchema");

// CONNECT TO DB
async function database() {
  try {
    mongoose.connect(
      // process.env.DB_CONNECT,
      "mongodb+srv://dera:dandilion12@cluster0.1r2a8mm.mongodb.net/test"

      // () => console.log("connected to db")
    );
    const userArrangement = await user.find({}).sort({ date: -1 });

    const commentArrangement = await user.find({}).sort({ date: -1 });
    console.log(userArrangement);
  } catch (error) {
    console.log(error);
  }
}

module.exports = database();
