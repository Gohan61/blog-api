const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.author_get = asyncHandler(async (req, res, next) => {
  const author = await User.findById(req.body.authorId);

  return res.json(author);
});

exports.user_create = [
  body("first_name", "Your first name must be at least 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("last_name", "Your last name must be at least 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("username", "Username must be at least 5 characters")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("password", "Password must be at least 5 characters")
    .trim()
    .isLength({ min: 5 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hashedPassword,
          author: req.body.author,
        });
        if (!errors.isEmpty()) {
          return res.json({ errors, user });
        } else if (err) {
          throw new Error("Error");
        } else {
          await user.save();
          res.redirect("/");
        }
      });
    } catch (err) {
      return next(err);
    }
  }),
];
