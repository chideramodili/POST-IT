const Comments = require("../models/commentModels");
const Tweetschema = require("../models/tweetSchema");

exports.get_all_comments = async (req, res, next) => {
  try {
    const comment = await Comments.find();
    res.json(comment);
  } catch (err) {
    res.json({ massage: err });
  }
};

exports.get_specific_comment = async (req, res, next) => {
  try {
    const idVerification = await Tweetschema.findOne({
      commentId: req.body.commentId
    });
    if (!idVerification) return res.status(400).send("id not found");
    const comment = await Comments.findById(req.params.commentId);
    res.json(comment);
  } catch (err) {
    res.json({ massage: err });
  }
};

exports.make_a_commont = async (req, res, next) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });
  const tweet = new Tweetschema({
    tweets: req.body.tweets,
    userName: req.body.userName,
    password: req.body.password
  });
  //  HASHING PASSWORDS
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);

  // COMMENTING
  const commentSchema = mongoose.Schema({
    postCommentedOn: {
      type: String,
      massage: postCommentedOn
    }
  });

  const comment = new Comments({
    // postId: req.body.postId,
    postsOwner: req.body.tweetersUsername,
    userName: req.body.userName,
    password: hashed,
    comment: req.body.comment,
    tweetCommentedon: req.params.tweets
  });
  // TO CONFIRM THAT YOU ARE A USER
  const { error } = loginValidation(req.body);
  const checking = await User.findOne({ userName: req.body.userName });
  if (!checking) return res.status(400).send("user name not found");
  const validPass = await bcrypt.compare(req.body.password, checking.password);
  if (!validPass) return res.status(400).send("wrong password");
  // TO CHECK IF POST EXISTS
  const postId = await Tweetschema.findOne({
    _id: req.params.postId
  });
  if (!postId)
    return res
      .status(400)
      .send("post is incorrecct or post does not exist not found");
  try {
    const savedComment = await comment.save();
    res.send(
      `   ${savedComment.userName.toUpperCase()} commented "${savedComment.comment.toUpperCase()}" to   ${postId.userName.toUpperCase()}'s : "${postId.tweets.toUpperCase()}" `
    );
  } catch (error) {
    res.json(error);
  }
};

exports.edit_comment = async (req, res, next) => {
  try {
    const updated = await Comments.updateOne(
      { _id: req.params.tweetId },
      { $set: { post: req.body.post } }
    );
    res.json(updated);
  } catch (err) {
    res.send({ massage: err });
  }
};

exports.delete_comment = async (req, res, next) => {
  try {
    const removed = await Comments.findByIdAndRemove(req.params.commentId);
    res.json(removed);
  } catch (err) {
    res.send({ massage: err });
  }
};
