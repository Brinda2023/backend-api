/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Register a user

  register: async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(401).json({
        message: "Username Email and Password must not be Empty",
      });
    }
    if (req.body.password.length < 6) {
      return res.status(401).json({
        message: "Password must be more then 5 chararacters",
      });
    }
    console.log(req.body);
    try {
      //Check if Mail already exists or not
      const user = await User.find({ email: req.body.email });
      if (user.email === req.body.email) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        //hash the password using bcrypt
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            try {
              //Create a new user in database
              const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
              }).fetch();
              return res.status(200).json(newUser);
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

  // Login user

  login: async (req, res) => {
    try {
      //Check if Mail exists or not
      const user = await User.findOne({ email: req.body.email });
      if (user.length < 1) {
        return res.status(401).json({
          message: "Mail doesn't exists",
        });
      } else {
        //Compare the hashed password using bcrypt
        console.log(user);
        bcrypt.compare(
          req.body.password,
          user.password,
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
                  username: user.username,
                  email: user.email,
                  userId: user.id,
                },
                "secret",
                { expiresIn: "1000h" }
              );

              // Store the user jwt token in database

              user.token = token;
              await User.update({ id: user.id }).set({ token: token });
              console.log(user);

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

  // Logout user

  logout: async (req, res) => {
    try {
      req.userData.token = "";
      // Update the user jwt token to null
      await User.update({ id: req.userData.id }).set({ token: "" });
      return res.status(200).json({
        message: "Logout Successful",
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Get all the users from the database

  find: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skipIndex = (page - 1) * limit;
    try {
      const users = await User.find({ limit: limit, skip: skipIndex });
      return res.status(200).json(users);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
