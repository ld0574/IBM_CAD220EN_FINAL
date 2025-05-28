const fs = require("fs");
const path = require("path");
const booksFile = path.join(__dirname, "../data/books.json");

// read books data
function readBooks() {
  const data = fs.readFileSync(booksFile);
  return JSON.parse(data).books;
}

// write books data
function writeBooks(books) {
  fs.writeFileSync(booksFile, JSON.stringify({ books }, null, 2));
}

// 1. get all books
exports.getAllBooks = (req, res) => {
  const books = readBooks();
  res.json(books);
};

// 2. get book by isbn
exports.getBookByISBN = (req, res) => {
  const books = readBooks();
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (book) res.json(book);
  else res.status(404).json({ error: "not found" });
};

// 3. get books by author
exports.getBooksByAuthor = (req, res) => {
  const books = readBooks();
  const result = books.filter((b) => b.author === req.params.author);
  res.json(result);
};

// 4. get books by title
exports.getBooksByTitle = (req, res) => {
  const books = readBooks();
  const result = books.filter((b) => b.title === req.params.title);
  res.json(result);
};

// 5. get book review
exports.getBookReview = (req, res) => {
  const books = readBooks();
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (book) res.json(book.reviews || []);
  else res.status(404).json({ error: "not found" });
};

// 8. add or modify review
exports.addOrModifyReview = (req, res) => {
  const username = req.user.username;
  const { review } = req.body;
  const isbn = req.params.isbn;

  if (!review) return res.status(400).json({ error: "review is required" });

  const books = readBooks();
  const book = books.find((b) => b.isbn === isbn);
  if (!book) return res.status(404).json({ error: "not found" });

  // search review
  const existingReview = (book.reviews || []).find(
    (r) => r.username === username
  );
  if (existingReview) {
    existingReview.review = review; // 修改
  } else {
    if (!book.reviews) book.reviews = [];
    book.reviews.push({ username, review }); // 添加
  }
  writeBooks(books);
  res.json({ msg: "success", reviews: book.reviews });
};

// 9. delete review
exports.deleteReview = (req, res) => {
  const username = req.user.username;
  const isbn = req.params.isbn;

  const books = readBooks();
  const book = books.find((b) => b.isbn === isbn);
  if (!book) return res.status(404).json({ error: "not found" });

  if (!book.reviews) book.reviews = [];
  const reviewIndex = book.reviews.findIndex((r) => r.username === username);
  if (reviewIndex === -1) {
    return res.status(404).json({ error: "no review" });
  }
  book.reviews.splice(reviewIndex, 1);
  writeBooks(books);
  res.json({ msg: "review deleted", reviews: book.reviews });
};
