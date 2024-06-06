const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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
    const username = req.body.username;

    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hashedPassword,
          author: req.body.author,
        });
        if (!errors.isEmpty() || User.exists({ username: username })) {
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

exports.user_update = [
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
    const username = req.body.username;

    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hashedPassword,
          author: req.body.author,
          _id: req.params.id,
        });
        if (!errors.isEmpty() || User.exists({ username: username })) {
          return res.json({ errors, user });
        } else if (err) {
          throw new Error("Error");
        } else {
          await User.findByIdAndUpdate(req.params.id, user);
          res.redirect("/" + req.params.id);
        }
      });
    } catch (err) {
      return next(err);
    }
  }),
];

exports.user_login = [
  body("username").trim().escape(),
  body("password").trim().escape(),

  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, "secret");
        return res.json({ user, token });
      });
    })(req, res);
  },
];
