const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const UserCollection = require("../models/userModel");
const BlogCollection = require("../models/blogModel");
const CommentCollection = require("../models/commentModel");
const { createUser } = require("../config/createUser");
const bcrypt = require("bcryptjs");

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
      // Check if the username is in database
      const user = await UserCollection.findOne({ username: { $regex: new RegExp(`^${value}$`, "i") } });
      // if (user || reservedUsernames.includes(value.toLowerCase())) {
      if (user) {
        throw new Error();
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
      console.log("Validation succesful");
      createUser(req.body.username, req.body.password, false, false).catch((err) => console.log(err));
      res.status(201).json({ message: "User succesfully created" });
    }
  }),
];

//! Create blog
exports.apiBlogPost = asyncHandler(async function (req, res, next) {
  // Create new blog
  const newBlog = {
    title: req.body.title,
    text: req.body.text,
    createdByUser: db.users[0],
  };
  // Add to database
  db.blogs.push(newBlog);
  res.status(201).json({ message: "Blog succesfully created", blog: newBlog, "all blogs": db.blogs });
});

//! Create comment
exports.apiCommentPost = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  if (!ID) {
    res.status(201).json({ message: "Comment succesfully created", comment: newComment, "all blogs": db.comments });
  }
  // Create new comment
  const newComment = {
    text: req.body.text,
    createdByUser: db.users[1],
    createdOnPost: db.blogs[ID],
  };
  // Add to database
  db.comments.push(newComment);
  res.status(201).json({ message: "Comment succesfully created", comment: newComment, "all blogs": db.comments });
});
