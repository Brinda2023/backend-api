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
    const admin = await Admin.findOne({ id: decoded.adminId });
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.adminData = admin;
    console.log(req.adminData);
    return next();
  } catch (error) {
    return res.serverError(error);
  }
};
