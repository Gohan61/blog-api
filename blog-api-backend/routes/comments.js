const express = require("express");
const router = express.Router();

const comments_controller = require("../controllers/CommentsController");

router.post("/:postId", comments_controller.new_comment);

module.exports = router;
