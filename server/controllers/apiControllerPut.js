const asyncHandler = require("express-async-handler");
const UserCollection = require("../models/userModel");
const BlogCollection = require("../models/blogModel");
const CommentCollection = require("../models/commentModel");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");

// Init fake DB
const mockDB = require("../database/mockDB");
const db = mockDB.createMockDB();

//! Updating password
exports.apiUserIDPassPut = [
  // Validate and sanitize the password field.
  body("password")
    .notEmpty()
    .withMessage("Password must not be empty")
    .trim()
    // .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{3,20}$/)
    // .withMessage(
    //   "Password must include at least one letter, one digit, one special character, and be between 3 and 20 characters"
    // )
    .custom(async (value, { req }) => {
      // Check if the username is in database
      const user = await UserCollection.findOne({ _id: req.params.id });
      if (!user) {
        throw new Error("Incorrect username");
      }
      // Compare DB
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        throw new Error("Incorrect password 1");
      }
    })
    .withMessage("Incorrect password 1")
    .escape(),
  body("newPasswordConfirm")
    .custom((value, { req }) => {
      return value === req.body.newPassword;
    })
    .withMessage("Passwords doesn't match"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password must not be empty")
    .trim()
    // .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{3,20}$/)
    // .withMessage(
    //   "Password must include at least one letter, one digit, one special character, and be between 3 and 20 characters"
    // )
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(400).json({
        data: {
          input: {
            msg: "Password update failed",
          },
          errors: errors.array(),
        },
      });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, +process.env.HASH_NUM);
      try {
        const updatedDoc = await UserCollection.findOneAndUpdate(
          { _id: req.params.id },
          { password: hashedPassword },
          { new: false }
        );

        if (!updatedDoc) {
          console.error("Password not updated");
          res.status(404).json({ message: "Password not updated" });
        } else {
          res.status(201).json({ message: "Password successfully updated" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }),
];

//! Edit Blog
exports.apiBlogIDPut = [
  // Validate and sanitize the post fields.
  body("blogTitle")
    .notEmpty()
    .withMessage("Title must not be empty")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Title must be between 2 and 50 characters")
    .escape(),
  body("blogText")
    .notEmpty()
    .withMessage("Text must not be empty")
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage("Text must be between 2 and 500 characters")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(404).json({
        data: {
          input: {
            title: req.body.blogTitle,
            text: req.body.blogText,
          },
          errors: errors.array(),
        },
      });
      return;
    } else {
      try {
        // Get the blog
        const blog = await BlogCollection.findOne({ _id: req.params.id });

        if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
        }
        // Update the blog
        blog.title = req.body.blogTitle;
        blog.text = req.body.blogText;

        // Save the blog
        await blog.save();

        res.status(200).json({ message: "Blog successfully edited" });
      } catch (error) {
        console.error("Error editing blog:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }),
];

//! Edit Comment
exports.apiCommentIDPut = [
  // Validate and sanitize the comment fields.
  body("commentText")
    .notEmpty()
    .withMessage("Comment must not be empty")
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage("Comment must be between 2 and 500 characters")
    .custom(async (value, { req }) => {
      // Check if the blog is in the database
      const comment = await CommentCollection.findOne({ _id: req.params.id });
      if (!comment) {
        throw new Error();
      }
    })
    .withMessage("Comment is unavailable")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async function (req, res, next) {
    const ID = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(400).json({
        data: {
          input: {
            text: req.body.commentText,
          },
          errors: errors.array(),
        },
      });
      return;
    } else {
      try {
        // Get the comment
        const comment = await CommentCollection.findOne({ _id: req.params.id });

        if (!comment) {
          return res.status(404).json({ message: "Comment not found" });
        }
        // Update the comment
        comment.text = req.body.commentText;

        // Save the comment
        await comment.save();

        res.status(200).json({ message: "Comment successfully edited" });
      } catch (error) {
        console.error("Error editing comment:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }),
];

//! Make admin
exports.apiUserIDAdminPutToggle = asyncHandler(async function (req, res, next) {
  try {
    const ID = req.params.id;
    const user = await UserCollection.findOne({ _id: ID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the user's isAdmin property
    user.isAdmin = !user.isAdmin;
    await user.save();

    // Response message
    const action = user.isAdmin ? "an admin" : "not an admin";
    res.status(200).json({ message: `User is ${action}` });
  } catch (error) {
    console.error("Error toggling user admin promotion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
