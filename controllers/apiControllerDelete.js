const asyncHandler = require("express-async-handler");
const mockDB = require("../database/mockDB");

// Init fake DB
const db = mockDB.createMockDB();

exports.apiUserIDDelete = asyncHandler(async function (req, res, next) {
  const ID = +req.params.id;
  const users = db.users.filter((user) => {
    return user.id !== ID;
  });
  db.users = { ...users };
  res.status(200).json({ message: "User deleted", old: db.users, new: users });
});

exports.apiBlogIDDelete = asyncHandler(async function (req, res, next) {
  const ID = +req.params.id;
  const blogs = db.blogs.filter((blog) => {
    return blog.id !== ID;
  });
  db.blogs = { ...blogs };
  res.status(200).json({ message: db.blogs[ID] });
});

exports.apiCommentIDDelete = asyncHandler(async function (req, res, next) {
  const ID = +req.params.id;
  const comments = db.comments.filter((comment) => {
    return comment.id !== ID;
  });
  db.comments = { ...comments };
  res.status(200).json({ message: db.comments });
});
