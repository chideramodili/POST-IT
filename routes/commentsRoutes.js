const router = require("express").Router();
const Comments = require("../models/commentModels");
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../schemas/userSchema");
const User = require("../models/users");
const Tweetschema = require("../models/tweetSchema");
const { validComment } = require("../schemas/comment_schema");

const commentController = require("../controllers/comment_controller");

//  TO GET ALL COMMENTS

router.get("/", commentController.get_all_comments);
//   TO GET A SPECIFIC COMMENT

router.get("/:commentId", commentController.get_specific_comment);

// TO MAKE A COMMENT ON A POST
router.post("/:postId", commentController.make_a_commont);
//  TO UPDATE A COMMENT
router.patch("/:commentId", commentController.edit_comment);

// TO DELETE A COMMENT
router.delete("/:commentId", commentController.delete_comment);

module.exports = router;
