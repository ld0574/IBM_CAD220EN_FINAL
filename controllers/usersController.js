const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const SECRET = "your_secret_key";
const usersFile = path.join(__dirname, "../data/users.json");

function readUsers() {
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data).users;
}
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify({ users }, null, 2));
}
// 6. register
exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username or password is required" });

  const users = readUsers();
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "username already exists" });
  }
  users.push({ username, password });
  writeUsers(users);
  res.json({ msg: "register success" });
};

// 7. login
exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username or password is required" });

  const users = readUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "username or password error" });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
};
