const express = require("express");
const router = express.Router();
const userService = require("../service/user_service");

const Joi = require("joi");
const bcrypt = require("bcryptjs");

const { validation, loginValidation } = require("../schemas/userSchema");
const userController = require("../controllers/user_controller");
const User = require("../models/users");
// TO GET A SPECIFC USER
router.get("/:userId", userController.get_a_specific_user),
  // userService.get_a_specific_user;
  // TO GET ALL USERS
  router.get("/", userController.get_all_user, userService.get_all_user);

// add user
router.post("/", userController.create_a_new_user, userService.create_new_user);

// LOGINING IN

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  const checking = await User.findOne({ email: req.body.email });
  if (!checking) return res.status(400).send("email not found");
  const validPass = await bcrypt.compare(req.body.password, checking.password);
  if (!validPass) return res.status(400).send("wrong password");
  res.send("login successfull");
});

// ? TO UPDATE A USER

router.patch("/:userId", userController.edit_user, userService.edit_user);

// TO DELETE A SPECIFIC User

router.delete("/:userId", userController.delete_user, userService.delete_user);

module.exports = router;
