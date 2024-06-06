const express = require("express");
const router = express.Router();

const admin_controller = require("../controllers/AdminController");

router.get("/", (req, res, next) => res.json("Welcome "));

router.get("/signin", admin_controller.admin_login);

module.exports = router;
