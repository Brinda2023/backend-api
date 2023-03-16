// Importing JWT

const jwt = require("jsonwebtoken");

// Decoded userdata into JWT token
// JWT token will be generated when user login

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    const user = await User.findOne({ id: decoded.userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.token === "") {
      return res.status(401).json({ message: "User is not Logged In!" });
    }
    req.userData = user;
    return next();
  } catch (error) {
    return res.serverError(error);
  }
};
