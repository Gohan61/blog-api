const express = require("express");
const router = express.Router();
const passport = require("passport");

const comments_controller = require("../controllers/CommentsController");

router.post(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  comments_controller.new_comment
);

module.exports = router;
