const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, key);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed because of JWT"
    });
  }
};
