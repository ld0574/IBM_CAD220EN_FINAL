const express = require("express");
const bodyParser = require("body-parser");

const booksRouter = require("./routes/books");
const usersRouter = require("./routes/users");

const app = express();
app.use(bodyParser.json());

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
