const express = require("express");
const articleCtrl = require("../controller/article");
const auth = require("../middleware/auth");

const router = express.Router();
// 获取文章列表
router.get("/", articleCtrl.getArticles);

// 获取用户关注的作者文章列表
router.post("/feed", articleCtrl.get);

// 获取文章
router.get("/user", auth, articleCtrl.getCurrentUser);

// 创建文章
router.put("/user", auth, articleCtrl.updateCurrentUser);

// 更新文章
router.put;
module.exports = router;
