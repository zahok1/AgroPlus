var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const User = require('../../Models/User.js');
const generateToken = require("../../utils/generateToken.js")
const protect = require('../../Middleware/Auth.js');

const user = express.Router();

// LOGIN
user.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(400);
      return res.json({
        message: "Could not find user",
      })
    }
  })
);

// REGISTER
user.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400);
      return res.json({
        message: "This user already exists",
      })
    }
    const user = await User.create({
      firstName, lastName, email, username, password
    });

    if (user) {
      res.status(201)
      return res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      return res.json({
        message: "Could not create user",
      })
    }
  })
);

// PROFILE
user.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);


module.exports = user;