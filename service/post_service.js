const TweetSchema = require("../models/tweetSchema");

exports.make_a_post = async post => {
  return await post.save();
};

exports.get_a_specific_post = async tweetId => {
  return await TweetSchema.findById({ _id: tweetId });
};

exports.get_all_posts = async () => {
  return await TweetSchema.find().sort({ date: -1 });
};

exports.edit_post = async (tweetId, tweets) => {
  return await TweetSchema.findByIdAndUpdate(
    { _id: tweetId },
    {
      $set: { tweets: tweets }
    }
  );
};

exports.delete_post = async tweetId => {
  return await TweetSchema.findByIdAndRemove({ _id: tweetId });
};
