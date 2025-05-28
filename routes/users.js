const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// 6. 注册
router.post("/register", usersController.register);

// 7. 登录
router.post("/login", usersController.login);

module.exports = router;
