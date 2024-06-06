const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comments");

exports.new_comment = [
  body("text").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      userID: req.user._id,
      timestamp: Date.now(),
      text: req.body.text,
      postID: req.params.postId,
    });

    if (!errors.isEmpty()) {
      return res.json({ errors, comment });
    } else {
      await comment.save();
      res.json(comment);
      res.redirect("/posts" + req.params.postId);
    }
  }),
];
