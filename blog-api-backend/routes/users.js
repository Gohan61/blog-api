const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/UserController");

router.get("/:authorId", user_controller.author_get);

module.exports = router;
