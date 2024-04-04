function mycors(req, res, next) {
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS, XMODIFY"
  );
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
}

module.exports = mycors;
