/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Admin Login

  login: async (req, res) => {
    try {
      //Check if Mail exists or not
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin.email !== req.body.email) {
        return res.status(401).json({
          message: "Mail doesn't exists",
        });
      } else {
        //Compare the hashed password using bcrypt
        bcrypt.compare(
          req.body.password,
          admin.password,
          async (err, result) => {
            if (err) {
              return res.status(401).json({
                message: "Auth Failed",
                error: err,
              });
            }
            if (result) {
              // Generate a jwt token when sign in
              const token = jwt.sign(
                {
                  username: admin.username,
                  email: admin.email,
                  adminId: admin.id,
                },
                "secret",
                { expiresIn: "1000h" }
              );

              //Update token in database
              admin.token = token;
              await Admin.update({ id: admin.id }).set(admin);
              console.log(admin);

              return res.status(200).json({
                message: "Auth successful",
                token: token,
              });
            }
            res.status(401).json({
              message: "Auth failed",
            });
          }
        );
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  //Logout admin

  logout: async (req, res) => {
    try {
      req.adminData.token = "";
      await Admin.update({ id: req.adminData.id }).set(req.adminData);
      return res.status(204).json({
        message: "Logout Successful",
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
};
