const User = require("../models/users");
const asyncHandler = require("express-async-handler");

exports.author_get = asyncHandler(async (req, res, next) => {
  const author = await User.findById(req.body.authorId);

  return res.json(author);
});
