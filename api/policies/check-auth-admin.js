// Importing JWT

const jwt = require("jsonwebtoken");

// Decoded userdata into JWT token
// JWT token will be generated when user login

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    const admin = await Admin.findOne({ id: decoded.adminId });
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (admin.token === "") {
      return res.status(401).json({ message: "Admin is not Logged In!" });
    }
    req.adminData = admin;
    return next();
  } catch (error) {
    return res.serverError(error);
  }
};
