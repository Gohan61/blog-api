const Post = require("../models/posts");
const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { post } = require("../app");
const { body, validationResult } = require("express-validator");

exports.allposts_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}).exec();

  return res.json(allPosts);
});

exports.post_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).exec();
  const comments = await Comment.find({ postId: req.params.postId }).exec();

  return res.json({ post, comments });
});

exports.post_create = [
  body("date").trim().isDate().escape(),
  body("title").trim().isLength({ min: 5 }).escape(),
  body("text").trim().isLength({ min: 20 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      authorID: req.user._id,
      date: req.body.date,
      title: req.body.title,
      text: req.body.text,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      return res.json({ errors, post });
    } else {
      await post.save();
      return res.json(post);
    }
  }),
];
