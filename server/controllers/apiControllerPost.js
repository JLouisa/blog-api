const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const UserCollection = require("../models/userModel");
const BlogCollection = require("../models/blogModel");
const CommentCollection = require("../models/commentModel");
const { createUser } = require("../config/createModel");
const dotenv = require("dotenv").config();

// Init fake DB
const mockDB = require("../database/mockDB");
const db = mockDB.createMockDB();

//! Create user
exports.apiUserPost = [
  // Validate and sanitize the name field.
  body("username")
    .notEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Username must be between 5 and 50 characters")
    .matches(/^[a-zA-Z0-9_]*$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .custom(async (value) => {
      try {
        // Check if the username is in the database
        const user = await UserCollection.findOne({ username: value.toLowerCase() });

        if (user) {
          throw new Error("Username is already taken.");
        }
      } catch (error) {
        // Handle the error gracefully
        if (error.message === "Username is already taken.") {
          // Specific error for duplicate username
          throw new Error("Username is already taken. Please choose a different one.");
        } else {
          // Handle other errors, log them, or rethrow if needed
          console.error("Error checking username:", error);
          throw new Error("An unexpected error occurred. Please try again later.");
        }
      }
    })
    .withMessage("Username is unavailable. Please try another one")
    .escape(),
  body("passwordConfirm")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords doesn't match"),
  body("password")
    .notEmpty()
    .withMessage("Password must not be empty")
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
            username: req.body.username,
          },
          errors: errors.array(),
        },
      });
      return;
    } else {
      console.log("Validation successful");
      createUser(req.body.username, req.body.password, false, false).catch((err) => console.log(err));
      res.status(201).json({ message: "User succesfully created" });
    }
  }),
];

//! Create blog
exports.apiBlogPost = [
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
    .isLength({ min: 2, max: 2000 })
    .withMessage("Text must be between 2 and 2000 characters")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(400).json({
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
      console.log("Validation successful");
      const newBlog = new BlogCollection({
        title: req.body.blogTitle,
        text: req.body.blogText,
        createdByUser: "65498dd10246d6592f593a6b",
        // createdByUser: req.user._id,
      });
      await newBlog.save();
      res.status(201).json({ data: newBlog, message: "Blog succesfully created" });
    }
  }),
];

//! Create comment
exports.apiCommentPost = [
  // Validate and sanitize the comment fields.
  body("commentText")
    .notEmpty()
    .withMessage("Comment must not be empty")
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage("Comment must be between 2 and 500 characters")
    .custom(async (value, { req }) => {
      // Check if the blog is in the database
      const blog = await BlogCollection.findOne({ _id: req.params.id });
      if (!blog) {
        throw new Error();
      }
    })
    .withMessage("blog is unavailable")
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
      console.log("Validation successful");
      const newComment = new CommentCollection({
        text: req.body.commentText,
        createdByUser: req.body.user,
        // createdByUser: req.user._id,
        createdOnPost: ID,
      });
      await newComment.save();
      res.status(201).json({ message: "Comment succesfully created" });
    }
  }),
];
