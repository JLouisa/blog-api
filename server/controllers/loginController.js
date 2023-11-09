const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserCollection = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.loginPost = asyncHandler(
  async function (req, res, next) {
    // try {
    //   const userData = await UserCollection.findOne({ username: req.username });
    //   // If user was not found
    //   if (!userData) {
    //     return res.status(404).json({ msg: "User not found" });
    //   }
    //   // Creating user info for token
    //   const user = {
    //     id: userData._id,
    //     username: userData.username,
    //     isAdmin: userData.isAdmin,
    //     isSuspended: userData.isSuspended,
    //   };

    const user = {
      id: 1,
      username: req.body.username,
    };

    jwt.sign({ user: user }, process.env.SECRET_JWT_KEY, (err, token) => {
      if (err) {
        console.error("JWT Sign Error:", err);
        return res.status(500).json({ msg: "Problem signing in" });
      }
      res.json({
        projectX: token,
      });
    });
  }
  //   catch (err) {
  //     console.error("Couldn't setup user login:", err);
  //     res.status(500).json({ msg: "Problem signing in" });
  //   }
  // }
);

exports.logoutPost = asyncHandler(async function (req, res, next) {
  return res.status(404).json({ msg: "User not found" });
});
