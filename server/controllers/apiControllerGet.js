const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserCollection = require("../models/userModel");
const BlogCollection = require("../models/blogModel");
const CommentCollection = require("../models/commentModel");

// Init fake DB
const mockDB = require("../database/mockDB");
const db = mockDB.createMockDB();

exports.apiUserGet = asyncHandler(async function (req, res, next) {
  const users = await UserCollection.find({}, "username createdDate isAdmin isSuspended").exec();
  res.status(200).json({ data: users });
});

exports.apiUserIsAdminGet = asyncHandler(async function (req, res, next) {
  if (req.body.isAdmin) {
    return res.status(200).json({ isAdmin: true });
  } else {
    return res.status(200).json({ isAdmin: false });
  }
});

exports.apiUserGet = asyncHandler(async function (req, res, next) {
  const ID = req.body.id;
  const user = await UserCollection.findOne({ _id: ID }, "_id username createdDate isAdmin isSuspended").exec();
  res.status(200).json({ data: user });
});

exports.apiUserIDGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const user = await UserCollection.find({ _id: ID }).exec();
  res.status(200).json({ data: user });
});

exports.apiBlogsGet = asyncHandler(async function (req, res, next) {
  const blogs = await BlogCollection.find({}).sort({ createdDate: -1 }).exec();
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
    CommentCollection.find({ createdOnPost: ID }).populate("createdByUser").sort({ createdDate: -1 }).exec(),
  ]);
  res.status(200).json({ data: [blog, comments] });
});
