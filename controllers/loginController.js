const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserCollection = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.loginPost = [
  body("username")
    .notEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Username must be between 5 and 50 characters")
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password must not be empty")
    .trim()
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{3,20}$/)
    .withMessage(
      "Password must include at least one letter, one digit, one special character, and be between 3 and 20 characters"
    )
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.status(400).json({
        data: {
          input: {
            username: req.body.username,
          },
          errors: errors.array(),
        },
      });
    }

    try {
      // Check if the username is in the database
      const user = await UserCollection.findOne({ username: req.body.username.toLowerCase() });

      if (!user) {
        return res.status(400).json({
          data: {
            input: {
              username: req.body.username,
            },
            errors: ["User doesn't exsist."],
          },
        });
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(400).json({
          data: {
            input: {
              username: req.body.username,
            },
            errors: ["Incorrect password. Try again."],
          },
        });
      }
    } catch (error) {
      // Handle the error gracefully
      if (error.message === "Incorrect password.") {
        // Specific error for duplicate username
        return res.status(400).json({
          data: {
            input: {
              username: req.body.username,
            },
            errors: ["Incorrect password. Try again."],
          },
        });
      } else {
        // Handle other errors, log them, or rethrow if needed
        console.error("Error checking password:", error);
        return res.status(400).json({
          data: {
            input: {
              username: req.body.username,
            },
            errors: ["Incorrect password. Try again!"],
          },
        });
      }
    }

    try {
      const userData = await UserCollection.findOne({ username: req.body.username });
      // If user was not found
      if (!userData) {
        return res.status(400).json({ msg: "User not found" });
      }
      // Creating user info for token
      const user = {
        id: userData._id,
        username: userData.username,
        isAdmin: userData.isAdmin,
        isSuspended: userData.isSuspended,
      };

      jwt.sign({ user: user }, process.env.SECRET_JWT_KEY, { expiresIn: "168h" }, (err, token) => {
        if (err) {
          console.error("JWT Sign Error:", err);
          return res.status(500).json({ msg: "Problem signing in" });
        }
        res.status(200).json({ user: { id: user.id, isAdmin: user.isAdmin }, projectX: token });
      });
    } catch (err) {
      console.error("Couldn't setup user login:", err);
      res.status(500).json({ msg: "Problem signing in" });
    }
  }),
];

exports.logoutPost = asyncHandler(async function (req, res, next) {
  return res.status(400).json({ msg: "User not found" });
});
