const Post = require("../models/posts");
const Comment = require("../models/comments");
const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const { post } = require("../app");
const { body, validationResult } = require("express-validator");

exports.allposts_admin_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}).exec();

  return res.json(allPosts);
});

exports.allposts_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({ published: true }).exec();

  return res.json(allPosts);
});

exports.post_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).exec();
  const comments = await Comment.find({ postID: req.params.postId }).exec();
  const author = await User.findById(post.authorID.toString()).exec();

  return res.json({ post, comments, author });
});

exports.post_create = [
  body("date").trim().isDate().escape(),
  body("title", "Title must be 5 characters at least")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("text", "Text must be 20 characters at least")
    .trim()
    .isLength({ min: 20 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      authorID: req.body.authorID,
      date: req.body.date,
      title: req.body.title,
      text: req.body.text,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      return res.json({ errors, post });
    } else {
      await post.save();
      return res.json({ message: "Post saved" });
    }
  }),
];

exports.post_update = [
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
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      return res.json({ errors, post });
    } else {
      const updatedItem = await Post.findByIdAndUpdate(req.params.id, post);
      res.redirect("/posts/" + req.params.id);
    }
  }),
];

exports.post_delete = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (post === null) {
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  } else {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
  }
});
