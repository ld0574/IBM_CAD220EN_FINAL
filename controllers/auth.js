const jwt = require("jsonwebtoken");
const SECRET = "your_secret_key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "未登录或token缺失" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "token无效" });
    req.user = user; // user.username
    next();
  });
}

module.exports = authenticateToken;
