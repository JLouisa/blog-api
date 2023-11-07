const asyncHandler = require("express-async-handler");
const UserCollection = require("../models/userModel");
const BlogCollection = require("../models/blogModel");
const CommentCollection = require("../models/commentModel");
const mongoose = require("mongoose");

// Init fake DB
const mockDB = require("../database/mockDB");
const db = mockDB.createMockDB();

exports.apiUserIDDeleteToggle = asyncHandler(async (req, res, next) => {
  try {
    const ID = req.params.id;
    const user = await UserCollection.findOne({ _id: ID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the user's isSuspended property
    user.isSuspended = !user.isSuspended;
    await user.save();

    // Response message
    const action = user.isSuspended ? "suspended" : "unsuspended";
    res.status(200).json({ message: `User successfully ${action}` });
  } catch (error) {
    console.error("Error toggling user suspension:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.apiBlogIDDeleteToggle = asyncHandler(async function (req, res, next) {
  try {
    const ID = req.params.id;
    const blog = await BlogCollection.findOne({ _id: ID });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Toggle the blog's isHidden property
    blog.isHidden = !blog.isHidden;
    await blog.save();

    // Response message
    const action = blog.isHidden ? "deleted" : "undeleted";
    res.status(200).json({ message: `Blog successfully ${action}` });
  } catch (error) {
    console.error("Error toggling blog deletion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.apiCommentIDDeleteToggle = asyncHandler(async function (req, res, next) {
  try {
    const ID = req.params.id;
    const comment = await CommentCollection.findOne({ _id: ID });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Toggle the user's isHidden property
    comment.isHidden = !comment.isHidden;
    await comment.save();

    // Response message
    const action = comment.isHidden ? "deleted" : "undeleted";
    res.status(200).json({ message: `Comment successfully ${action}` });
  } catch (error) {
    console.error("Error toggling comment deletion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
