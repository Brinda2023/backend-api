/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    // Get all parameters from request
    let params = req.allParams();
    console.log(params);
    try {
      //Check if Mail already exists or not
      const user = await User.find({ email: params.email });
      if (user.email === params.email) {
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
              //Create a new user in database
              const newUser = await User.create({
                username: params.username,
                email: params.email,
                password: hash,
              });
              return res.ok(newUser);
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
  login: async (req, res) => {
    // Get all parameters from request
    let params = req.allParams();
    try {
      //Check if Mail exists or not
      const user = await User.find({ email: params.email });
      if (user.length < 1) {
        return res.status(401).json({
          message: "Mail doesn't exists",
        });
      } else {
        //Compare the hashed password using bcrypt
        console.log(user[0].password);
        bcrypt.compare(
          params.password,
          user[0].password,
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
                  email: user.email,
                  userId: user._id,
                },
                "secret",
                { expiresIn: "1000h" }
              );
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
  logout: (req, res) => {
    return res.ok("k!");
  },
  find: async (req, res) => {
    try {
      const users = await User.find();
      return res.ok(users);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
