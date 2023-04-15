const Tweetschema = require("../models/tweetSchema");
const postService = require("../service/post_service");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { loginValidation } = require("../schemas/userSchema");

exports.get_all_posts = async (req, res, next) => {
  try {
    const posts = await postService.get_all_posts();
    res.json(posts);
  } catch (err) {
    res.json({ massage: err });
  }
};

exports.get_specific_post = async (req, res, next) => {
  try {
    const post = await postService.get_a_specific_post(req.params.tweetId);
    if (!post) {
      res.send("post id not found");
    }
    res.json(post);
  } catch (err) {
    res.json({ massage: err });
  }
};

exports.add_post = async (req, res, next) => {
  const user = new User(_.pick(req.body, ["userName", "email", "password"]));

  const tweet = new Tweetschema(
    _.pick(req.body, ["tweets", "userName", "password"])
  );

  const { error } = loginValidation(req.body);
  const checking = await User.findOne({ userName: req.body.userName });
  if (!checking) return res.status(400).send("user name not found");
  const validPass = await bcrypt.compare(req.body.password, checking.password);
  if (!validPass) return res.status(400).send("wrong password");

  const savedTweet = await postService.make_a_post(tweet);
  res.json(savedTweet);
};

exports.edit_post = async (req, res, next) => {
  const post = await postService.get_a_specific_post(req.params.tweetId);
  if (!post) {
    res.send("post with the given id was not found");
  }
  try {
    // const updated = await Tweetschema.updateOne(
    //   { _id: req.params.tweetId },
    //   { $set: { tweets: req.body.tweets } }
    // );
    const updated = await postService.edit_post(
      req.params.tweetId,
      req.body.tweets
    );
    res.json(updated);
  } catch (err) {
    res.send({ massage: err });
  }
};

exports.delete_post = async (req, res, next) => {
  try {
    const check = await postService.get_a_specific_post(req.params.tweetId);
    if (!check) {
      res.send("id not found");
    } else {
      const removed = await postService.delete_post(req.params.tweetId);
      res.json(removed);
    }

    //
  } catch (error) {
    res.status(400).send(error);
  }
};
