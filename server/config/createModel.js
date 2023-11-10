const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserCollection = require("../models/userModel");

const createUser = async (username, password, isAdmin, isSuspended) => {
  try {
    const hashedPassword = await bcrypt.hash(password, +process.env.HASH_NUM);
    const user = new UserCollection({
      username: username.toLowerCase(),
      password: hashedPassword,
      isAdmin,
      isSuspended,
    });
    await user.save();
    console.log(`User created: ${username}`);
  } catch (err) {
    console.error(`Error creating user: ${username}`, err);
  }
};

module.exports = { createUser };
