const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const PlayerCollection = require("../../models/waldo/playerModel");
const CharacterCollection = require("../../models/waldo/characterModel");

// Init fake DB
exports.characterGet = asyncHandler(async function (req, res, next) {
  const users = await UserCollection.find({}, "username createdDate isAdmin isSuspended").exec();
  res.status(200).json({ data: users });
});

exports.leaderboardGet = asyncHandler(async function (req, res, next) {
  const ID = req.body.id;
  const user = await UserCollection.findOne({ _id: ID }, "_id username createdDate isAdmin isSuspended").exec();
  if (user.isAdmin) {
    return res.status(200).json({ isAdmin: true });
  } else {
    return res.status(200).json({ isAdmin: false });
  }
});

exports.leaderboardPost = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const [blog, comments] = await Promise.all([
    BlogCollection.find({ _id: ID }).exec(),
    CommentCollection.find({ createdOnPost: ID }).populate("createdByUser").sort({ createdDate: -1 }).exec(),
  ]);
  res.status(200).json({ data: [blog, comments] });
});
