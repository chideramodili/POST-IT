const router = require("express").Router();
// const bcrypt = require("bcryptjs");
const { loginValidation } = require("../schemas/userSchema");
const Tweetschema = require("../models/tweetSchema");
const User = require("../models/users");
const postController = require("../controllers/post_controller");
const postService = require("../service/post_service");
// const users = require("../models/users");
//  TO GET ALL POSTS
router.get("/", postController.get_all_posts, postService.get_all_posts);
// TO GET A SPECIFIC POST
router.get(
  "/:tweetId",
  postController.get_specific_post,
  postService.get_a_specific_post
);

// TO ADD A POST
router.post("/", postController.add_post, postService.make_a_post);
//  TO UPDATE A POST
router.patch("/:tweetId", postController.edit_post, postService.edit_post);

// TO DELETE POST
router.delete("/:tweetId", postController.delete_post, postService.delete_post);

module.exports = router;
