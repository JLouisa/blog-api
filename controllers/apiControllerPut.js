const asyncHandler = require("express-async-handler");
const mockDB = require("../database/mockDB");

// Init fake DB
const db = mockDB.createMockDB();

exports.apiUserIDPut = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  // Find and Update
  if (req.body.username) db.users[ID].username = req.body.username;
  if (req.body.password) db.users[ID].password = req.body.password;
  if (req.body.isAdmin) db.users[ID].isAdmin = req.body.isAdmin;
  if (req.body.isSuspended) db.users[ID].isSuspended = req.body.isSuspended;
  res.status(204).json(204, { message: "User succesfully updated", user: db.users[ID] });
});

exports.apiBlogIDPut = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const oldBlog = { ...db.blogs[ID] };
  // Find and Update
  if (req.body.title) db.blogs[ID].title = req.body.title;
  if (req.body.text) db.blogs[ID].text = req.body.text;
  res.status(200).json({ message: "Blog succesfully updated", "old blog": oldBlog, "new blogs": db.blogs[ID] });
});

exports.apiCommentIDPut = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const oldComment = { ...db.comments[ID] };
  // Find and Update
  if (req.body.text) db.comments[ID].text = req.body.text;
  res
    .status(200)
    .json({ message: "Comment succesfully updated", "old comment": oldComment, "new comment": db.comments[ID] });
});
