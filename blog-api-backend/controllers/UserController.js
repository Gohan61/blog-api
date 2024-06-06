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

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ message: "Validation Failed", errors: errors.array() });
      return;
    }
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.json({ error: "User not found", user: user });
      } else {
        req.login(user, { session: false });
        jwt.sign(
          { user: user },
          "secret",
          { expiresIn: "10d" },
          (err, token) => {
            if (err) console.log(err);
            res.status(200).json({ token: token });
          }
        );
      }
    })(req, res, next);
  }),
];
