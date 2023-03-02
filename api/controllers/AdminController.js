/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Register A new Admin
  register: async (req, res) => {
    // Get all parameters from request
    let params = req.allParams();
    console.log(params);
    try {
      //Check if Mail already exists or not
      const admin = await Admin.find({ email: params.email });
      if (admin.email === params.email) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        //hash the password using bcrypt
        bcrypt.hash(params.password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            try {
              //Create a new admin in database
              const newAdmin = await Admin.create({
                username: params.username,
                email: params.email,
                password: hash,
              });
              return res.ok(newAdmin);
            } catch (err) {
              return res.serverError(err);
            }
          }
        });
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Admin Login

  login: async (req, res) => {
    // Get all parameters from request
    let params = req.allParams();
    console.log(params);
    try {
      //Check if Mail exists or not
      let admin = await Admin.find({ email: params.email });
      if (admin.length < 1) {
        return res.status(401).json({
          message: "Mail doesn't exists",
        });
      } else {
        //Compare the hashed password using bcrypt
        bcrypt.compare(
          params.password,
          admin[0].password,
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
                  username: admin[0].username,
                  email: admin[0].email,
                  userId: admin[0].id,
                },
                "secret",
                { expiresIn: "1000h" }
              );

              //Update token in database
              admin[0].token = token;
              await Admin.update({ id: admin[0].id }).set(admin[0]);
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
      //Update token in database
      let admin = await Admin.find({ _id: req.userData.userId });
      admin[0].token = "";
      await Admin.update({ id: admin[0].id }).set(admin[0]);
      return res.ok(admin[0]);
    } catch (err) {
      return res.serverError(err);
    }
  },

  //Get all admins from database

  find: async (req, res) => {
    try {
      const admins = await Admin.find();
      return res.ok(admins);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
