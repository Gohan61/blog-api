const Post = require("../models/posts");
const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");

exports.allposts_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}).exec();

  return res.json(allPosts);
});

exports.post_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).exec();

  return res.json(post);
});

exports.post_comment_get = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({}).exec();

  return res.json(comments);
});
