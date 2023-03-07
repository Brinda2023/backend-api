// Importing JWT

const jwt = require("jsonwebtoken");

// Decoded userdata into JWT token
// JWT token will be generated when user login

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, "secret");
    console.log(decoded);
    const user = await User.findOne({ id: decoded.userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userData = user;
    console.log(req.userData);
    return next();
  } catch (error) {
    return res.serverError(error);
  }
};
