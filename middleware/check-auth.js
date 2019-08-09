const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  console.log('u authu smo.')
  console.log("Evo parametara: ", process.env.AWS_SECRET_ACCESS, process.env.AWS_KEY_ID, process.env.AWS_REGION)
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, key);
    console.log('zovemo next')
    next();
  } catch (error) {
    console.log('puca')
    res.status(401).json({
      message: "Auth failed because of JWT"
    });
  }
};