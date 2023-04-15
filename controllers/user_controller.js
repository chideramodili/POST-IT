const User = require("../models/users");
const _ = require("lodash");
const userService = require("../service/user_service");
const { validation } = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");

// const joi = require("joi");

exports.get_all_user = async (req, res) => {
  try {
    const users = await userService.get_all_user();
    res.json(users);
  } catch (err) {
    res.json({ massage: err });
  }
};

exports.get_a_specific_user = async (req, res) => {
  try {
    const user = await userService.get_a_specific_user(req.params.userId);
    if (!user) {
      res.send("id not found");
    }
    res.json(user);
  } catch (err) {
    res.json({ massage: err });
  }
};

exports.create_a_new_user = async (req, res) => {
  const user = new User(_.pick(req.body, ["userName", "password", "email"]));

  const users = await userService.create_new_user(user);
  res.json(users);
};

exports.edit_user = async (req, res) => {
  try {
    // if (!User.find(req.params.userId)) {
    //   res.send("id not found");
    // }
    const updated = await userService.edit_user(
      req.params.userId,
      req.body.userName
    );
    if (!updated) {
      res.json("id not found");
      return;
    }
    const newUser = updated;
    res.send(newUser);
  } catch (err) {
    res.send({ massage: err });
  }
};

exports.delete_user = async (req, res, next) => {
  try {
    const availableUser = await userService.get_a_specific_user(
      req.params.userId
    );

    if (!availableUser) return res.status(404).send("user id not found");

    const user = await userService.soft_delete_user(req.params.userId);

    res.send(user);
  } catch (err) {
    // res.send({ massage: err });
  }
};
