const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const UserCollection = require("../models/userModel");
const BlogCollection = require("../models/blogModel");
const CommentCollection = require("../models/commentModel");

// Init fake DB
const mockDB = require("../database/mockDB");
const db = mockDB.createMockDB();

exports.apiUserGet = asyncHandler(async function (req, res, next) {
  const users = await UserCollection.find({}, "username createdDate").exec();
  res.status(200).json({ data: users });
});

exports.apiUserIDGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const user = await UserCollection.find({ _id: ID }).exec();
  res.status(200).json({ data: user });
});

exports.apiBlogsGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const blogs = await BlogCollection.find({}).exec();
  res.status(200).json({ data: blogs });
});

exports.apiBlogsIDGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const blog = await BlogCollection.find({ _id: ID }).exec();
  res.status(200).json({ data: blog });
});

exports.apiCommentGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const [blog, comments] = await Promise.all([
    BlogCollection.find({ _id: ID }).exec(),
    CommentCollection.find({ createdOnPost: ID }).populate("createdByUser"),
  ]);
  res.status(200).json({ data: [blog, comments] });
});
