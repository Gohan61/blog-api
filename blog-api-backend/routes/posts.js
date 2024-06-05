const express = require("express");
const router = express.Router();

const posts_controller = require("../controllers/postsController");

router.get("/", posts_controller.allposts_get);

router.get("/:postId", posts_controller.post_get);

router.get("/:postId/comments", posts_controller.post_comment_get);

module.exports = router;
