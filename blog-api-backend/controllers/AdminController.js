const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.admin_login = [
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
      } else if (!user.author) {
        res.json({ message: "You are not an author" });
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
