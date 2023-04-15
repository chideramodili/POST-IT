const usersRouter = require("./usersRoutes");
const tweetRoute = require("./tweetRoutes");
const commentRoute = require("./commentsRoutes");

module.exports = app => {
  // MIDDLEWEARS

  app.use("/user", usersRouter);
  app.use("/tweets", tweetRoute);
  app.use("/comment", commentRoute);
};
