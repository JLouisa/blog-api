const asyncHandler = require("express-async-handler");
const mockDB = require("../database/mockDB");

// Init fake DB
const db = mockDB.createMockDB();

//! Create user
exports.apiUserPost = asyncHandler(async function (req, res, next) {
  // Create new user
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    isAdmin: false,
    isSuspended: false,
  };
  // Add to database
  db.users.push(newUser);
  res.status(201).json({ message: "User succesfully created", user: newUser, "all users": db.users });
});

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
