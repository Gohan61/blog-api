const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/UserController");

router.get("/:authorId", user_controller.author_get);

router.post("/", user_controller.user_create);

module.exports = router;
