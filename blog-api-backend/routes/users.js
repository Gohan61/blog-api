const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/UserController");

router.get("/:authorId", user_controller.author_get);

router.post("/signup", user_controller.user_create);

router.put("/:authorId", user_controller.user_update);

module.exports = router;
