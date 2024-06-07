const express = require("express");
const router = express.Router();
const passport = require("passport");

const posts_controller = require("../controllers/postsController");

router.get("/", posts_controller.allposts_get);

router.get("/:postId", posts_controller.post_get);

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

module.exports = router;
