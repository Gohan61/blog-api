const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.admin_login = [
  body("username").trim().escape(),
  body("password").trim().escape(),

  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin",
  }),
];
