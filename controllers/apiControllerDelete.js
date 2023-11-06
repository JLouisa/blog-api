const asyncHandler = require("express-async-handler");
const mockDB = require("../database/mockDB");

// Init fake DB
const db = mockDB.createMockDB();

exports.apiUserGet = asyncHandler(async function (req, res, next) {
  res.status(200).json({ message: db.users });
});

exports.apiUserIDGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  res.status(200).json({ message: db.users[ID] });
});

exports.apiBlogsGet = asyncHandler(async function (req, res, next) {
  res.status(200).json({ message: db.blogs });
});

exports.apiCommentGet = asyncHandler(async function (req, res, next) {
  res.status(200).json({ message: db.comments });
});
