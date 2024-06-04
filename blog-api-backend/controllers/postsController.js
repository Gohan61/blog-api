const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");

exports.allposts_get = (req, res, next) => {
  const post = [{ id: 1, test: "Here" }];

  return res.json(post);
};

exports.post_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  return res.json(post);
});
