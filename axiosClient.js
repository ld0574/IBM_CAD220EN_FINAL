const axios = require("axios");
// for screenshot only

// 10. get all books (async callback)
function promiseCb(cb, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb(resolve);
    }, delay);
  });
}
router.get("/", async function (req, res) {
  try {
    const data = await promiseCb((resolve) => {
      const bookList = Object.values(books);
      resolve(bookList);
    }, 1000); // 1秒延迟
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
});
router.get("/books", function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books, null, 4)));
  });
  get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// 11. get book by isbn
function promiseCb(cb, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb(resolve);
    }, delay);
  });
}
router.get("/isbn/:isbn", async function (req, res) {
  try {
    const data = await promiseCb((resolve) => {
      const isbn = req.params.isbn;
      // books 是对象
      const book = books[isbn];
      resolve(book);
    }, 1000);
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "Invalid ISBN" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
});

// 12. get books by author
function promiseCb(cb, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb(resolve);
    }, delay);
  });
}
router.get("/author/:author", async function (req, res) {
  try {
    const data = await promiseCb((resolve) => {
      const author = (req.params.author + "").toLocaleLowerCase();
      const booksList = Object.values(books);
      const newBooks = booksList.filter((book) =>
        book.author.toLocaleLowerCase().match(author)
      );
      resolve(newBooks);
    }, 1000);
    if (Array.isArray(data) && data.length) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "Invalid author" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
});

// 13. get books by title
function promiseCb(cb, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb(resolve);
    }, delay);
  });
}
router.get("/title/:title", async function (req, res) {
  try {
    const data = await promiseCb((resolve) => {
      const title = (req.params.title + "").toLocaleLowerCase();
      const booksList = Object.values(books);
      const newBooks = booksList.filter((book) =>
        book.title.toLocaleLowerCase().match(title)
      );
      resolve(newBooks);
    }, 1000);
    if (Array.isArray(data) && data.length) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "Invalid title" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
});
