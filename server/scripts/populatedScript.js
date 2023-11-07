#! /usr/bin/env node
console.log("This script populates some test users, blog and comments to your database.");

const UserCollection = require("../models/userModel");
const BlogCollection = require("../models/blogModel");
const CommentCollection = require("../models/commentModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

//! MongoDB Setup
const mongoDB = process.env.MONGODB_LINK;

const users = [];
const blogs = [];
const comments = [];

main().catch((err) => console.log(err));

//! Generate the data
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await popUsers();
  await popBlogs();
  await popComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

//! Users
// Create users function
async function usersCreate(index, username, password, isAdmin) {
  try {
    const hashedPassword = await bcrypt.hash(password, +process.env.HASH_NUM);
    const user = new UserCollection({ username, password: hashedPassword, isAdmin });
    await user.save();
    users[index] = user;
    console.log(`Added user: ${username}`);
  } catch (err) {
    console.error(`Error creating user: ${username}`, err);
  }
}

// Populate the categories
async function popUsers() {
  console.log("Adding users");
  await Promise.all([
    usersCreate(0, "adamthefirst", "apple", false),
    usersCreate(1, "johndoe123", "theapples123", false),
    usersCreate(2, "janesmith456", "password123", false),
    usersCreate(3, "michaelj", "testpass", false),
    usersCreate(4, "emilyb", "securepwd", false),
    usersCreate(5, "davidw123", "p@ssw0rd", false),
    usersCreate(6, "sarah_a", "examplepass", false),
    usersCreate(7, "roberttaylor", "userpass", false),
    usersCreate(8, "jennifer123", "letmein", false),
    usersCreate(9, "willm", "changeme", false),
    usersCreate(10, "oliviam", "newuser", false),
  ]);
}

//! Posts
// Create blogs function
async function blogCreate(index, title, text, createdByUser) {
  const blogdetails = { title, text, createdByUser };
  const blog = new BlogCollection(blogdetails);
  await blog.save();
  blogs[index] = blog;
  console.log(`Added blog: ${title}`);
}

// Populate the manufacturer
async function popBlogs() {
  console.log("Adding blogs");
  await Promise.all([
    blogCreate(
      0,
      "Why I couldn't stop Eve",
      "She ate the apple when I was asleep. Then baked me a pie and gave it to me. I didn't know at the time, but after eating the pie, it was too late, and I didn't care anymore. Plus she is my wife and partner. For better and for worse.",
      users[0],
      false
    ),
    blogCreate(
      1,
      "A Day at the Park",
      "Spent a lovely day at the park with the family. We played frisbee, had a picnic, and enjoyed the sunshine.",
      users[1],
      false
    ),
    blogCreate(
      2,
      "Coding Adventures",
      "Just completed a challenging coding project. It's amazing how a few lines of code can create something incredible.",
      users[2],
      false
    ),
    blogCreate(
      3,
      "Travel Diaries",
      "Exploring a new city is always an adventure. The architecture, the food, and the people make it an unforgettable experience.",
      users[3],
      true
    ),
    blogCreate(
      4,
      "Cooking Experiment",
      "Tried a new recipe today. It didn't turn out as expected, but it was fun experimenting in the kitchen.",
      users[4],
      false
    ),
    blogCreate(
      5,
      "Movie Night",
      "Movie night with friends is the best! We watched a classic and had popcorn and laughter all night.",
      users[5],
      true
    ),
    blogCreate(
      6,
      "Hiking in the Mountains",
      "Took a break from city life and went hiking in the mountains. The views were breathtaking.",
      users[6],
      false
    ),
    blogCreate(
      7,
      "New Pet",
      "Meet my new furry friend, a cute little puppy named Max. He's already stolen my heart.",
      users[7],
      false
    ),
    blogCreate(
      8,
      "Gardening Bliss",
      "Spent the day in the garden, planting colorful flowers and tending to the vegetables. Nature is so soothing.",
      users[8],
      false
    ),
    blogCreate(
      9,
      "Bookworm's Paradise",
      "There's nothing better than getting lost in a good book. I can't put this one down.",
      users[9],
      false
    ),
    blogCreate(
      10,
      "Artistic Journey",
      "Started a new art project today. The canvas is blank, and the possibilities are endless.",
      users[1],
      false
    ),
    blogCreate(
      11,
      "Beach Day",
      "Relaxed at the beach, feeling the warm sand between my toes and listening to the soothing waves.",
      users[3],
      false
    ),
    blogCreate(
      12,
      "Home Renovation",
      "Transforming our living space one room at a time. DIY projects are both challenging and rewarding.",
      users[5],
      true
    ),
    blogCreate(
      13,
      "Music Madness",
      "Attended a live concert last night. The energy, the music, and the crowd made it an unforgettable experience.",
      users[7],
      false
    ),
    blogCreate(
      14,
      "Running for a Cause",
      "Participated in a charity run to raise funds for a good cause. It's amazing how running can make a difference.",
      users[2],
      false
    ),
    blogCreate(
      15,
      "Morning Serenity",
      "Woke up early to catch the sunrise. The world is so peaceful in the early hours.",
      users[4],
      false
    ),
    blogCreate(
      16,
      "Family Reunion",
      "Reunited with extended family after a long time. Laughter, stories, and love filled the air.",
      users[6],
      false
    ),
    blogCreate(
      17,
      "New Work Project",
      "Excited to embark on a new work project. Challenges await, but so do opportunities.",
      users[8],
      false
    ),
    blogCreate(
      18,
      "Unexpected Adventure",
      "A spontaneous road trip led to unexpected discoveries and unforgettable memories.",
      users[0],
      false
    ),
  ]);
}

//! Comments
// Create comments function
async function commentCreate(index, text, createdByUser, createdOnPost, isHidden) {
  const comment = new CommentCollection({ text, createdByUser, createdOnPost, isHidden });
  if (comment.isHidden === undefined) comment.isHidden = false;
  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${createdByUser.username}`);
}

// Populate the locations
async function popComments() {
  console.log("Adding Comments");
  await Promise.all([
    commentCreate(0, "Wow, how did the apple taste?", users[1], blogs[0], false),
    commentCreate(1, "It must have been a unique experience!", users[3], blogs[0], false),
    commentCreate(2, "I can't believe you ate the whole thing.", users[2], blogs[0], false),
    commentCreate(3, "A pie as a disguise, that's creative!", users[4], blogs[0], false),
    commentCreate(4, "I need to try this recipe!", users[5], blogs[0], false),
    commentCreate(5, "Looks like a perfect day!", users[0], blogs[1], false),
    commentCreate(6, "Family time is the best time.", users[2], blogs[1], false),
    commentCreate(7, "Frisbee is such a fun game.", users[3], blogs[1], false),
    commentCreate(8, "Glad you enjoyed the sunshine.", users[4], blogs[1], false),
    commentCreate(9, "Picnics are the best, aren't they?", users[6], blogs[1], false),
    commentCreate(10, "That park looks beautiful!", users[7], blogs[1], false),
    commentCreate(11, "Sunshine and frisbee, perfect combo!", users[8], blogs[1], false),
    commentCreate(12, "I love days like these.", users[9], blogs[1], false),
    commentCreate(13, "Sunshine and family - a great combination!", users[1], blogs[1], false),
    commentCreate(14, "Kudos on completing the project!", users[0], blogs[2], false),
    commentCreate(15, "Coding adventures are the best adventures.", users[2], blogs[2], false),
    commentCreate(16, "Code magic at work!", users[4], blogs[2], false),
    commentCreate(17, "Congrats on the coding achievement!", users[6], blogs[2], false),
    commentCreate(18, "Programming is a journey.", users[8], blogs[2], false),
    commentCreate(19, "I wish I could travel more.", users[1], blogs[3], true),
    commentCreate(20, "Exploring new cities is so enriching.", users[3], blogs[3], false),
    commentCreate(21, "The architecture in new cities is fascinating.", users[5], blogs[3], false),
    commentCreate(22, "Tasting new foods is the best part of travel.", users[7], blogs[3], false),
    commentCreate(23, "Meeting new people is the heart of adventure.", users[9], blogs[3], false),
    commentCreate(24, "Cooking experiments are always fun!", users[2], blogs[4], false),
    commentCreate(25, "Even when the recipe doesn't go as planned.", users[4], blogs[4], false),
    commentCreate(26, "It's all about the journey in the kitchen.", users[6], blogs[4], false),
    commentCreate(27, "Keep experimenting and having fun!", users[8], blogs[4], false),
    commentCreate(28, "Movie night with friends is a blast!", users[1], blogs[5], true),
    commentCreate(29, "Popcorn and laughter - perfect combo.", users[3], blogs[5], false),
    commentCreate(30, "What movie did you watch?", users[5], blogs[5], false),
    commentCreate(31, "Movie nights are the best nights.", users[7], blogs[5], false),
    commentCreate(32, "Sounds like a great time with friends.", users[9], blogs[5], false),
    commentCreate(33, "Hiking in the mountains sounds amazing!", users[0], blogs[6], false),
    commentCreate(34, "The views must have been breathtaking.", users[2], blogs[6], false),
    commentCreate(35, "Nature has a way of soothing the soul.", users[4], blogs[6], false),
    commentCreate(36, "Did you spot any wildlife?", users[6], blogs[6], false),
    commentCreate(37, "A day in the mountains is a day well spent.", users[8], blogs[6], false),
    commentCreate(38, "Meeting Max must have been a joy!", users[1], blogs[7], false),
    commentCreate(39, "Puppies bring so much happiness.", users[3], blogs[7], false),
    commentCreate(40, "What breed is Max?", users[5], blogs[7], false),
  ]);
}
