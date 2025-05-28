const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const authenticateToken = require("../controllers/auth");

// 1. 获取所有书籍
router.get("/", booksController.getAllBooks);

// 2. 通过ISBN获取书籍
router.get("/isbn/:isbn", booksController.getBookByISBN);

// 3. 通过作者获取书籍
router.get("/author/:author", booksController.getBooksByAuthor);

// 4. 通过标题获取书籍
router.get("/title/:title", booksController.getBooksByTitle);

// 5. 获取书籍评论
router.get("/:isbn/review", booksController.getBookReview);

// 8. 添加/修改评论（需登录）
router.post(
  "/:isbn/review",
  authenticateToken,
  booksController.addOrModifyReview
);

// 9. 删除评论（需登录）
router.delete("/:isbn/review", authenticateToken, booksController.deleteReview);

module.exports = router;
