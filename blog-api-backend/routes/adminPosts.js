const express = require("express");
const router = express.Router();
const passport = require("passport");

const posts_controller = require("../controllers/postsController");
const comments_controller = require("../controllers/CommentsController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  posts_controller.allposts_get
);

router.get(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  posts_controller.post_get
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  posts_controller.post_create
);

router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  posts_controller.post_update
);

router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  posts_controller.post_delete
);

router.delete(
  "/comment/:commentId",
  passport.authenticate("jwt", { session: false }),
  comments_controller.comment_delete
);

module.exports = router;
