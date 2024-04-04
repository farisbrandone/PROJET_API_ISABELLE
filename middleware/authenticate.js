const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const tokenheaders = req.headers["authorization"];
  console.log(tokenheaders);
  token = tokenheaders.split(" ")[1];
  /*const token = authHeader.replace(/^Bearer\s+/, "");*/
  console.log("token is :", token);
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userEmail = decoded.userEmail;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
