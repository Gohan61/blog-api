const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comments");
const User = require("../models/users");

exports.new_comment = [
  body("text", "Comment needs to be at least two characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      userID: req.body.userID,
      username: req.body.username,
      timestamp: req.body.timestamp,
      text: req.body.text,
      postID: req.params.postId,
    });

    if (!errors.isEmpty()) {
      return res.status(500).json({ errors, comment });
    } else {
      await comment.save();
      return res.status(200).json({ message: "Comment saved" });
    }
  }),
];
