#! /usr/bin/env node
console.log("This script populates some test player and character to my database.");

const CharacterCollection = require("../models/waldo/characterModel");
const PlayerCollection = require("../models/waldo/playerModel");
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

//! MongoDB Setup
const mongoDB = process.env.MONGODB_LINK;

const playerArr = [];
const characterArr = [];

main().catch((err) => console.log(err));

//! Generate the data
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await popPlayer();
  await popCharacter();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

//! Users
// Create player function
async function playerCreate(index, player, score, map) {
  try {
    const playerN = new PlayerCollection({ player, score, map });
    await playerN.save();
    playerArr[index] = playerN;
    console.log(`Added player: ${playerN.player}`);
  } catch (err) {
    console.error(`Error creating player: ${player}`, err);
  }
}

// Populate the categories
async function popPlayer() {
  console.log("Adding player");
  await Promise.all([
    playerCreate(0, "adamthefirst", 100, "rickMortyMap"),
    playerCreate(1, "johndoe123", 200, "disneyMap"),
    playerCreate(2, "janesmith456", 112, "pokemonMap"),
    playerCreate(3, "michaelj", 321, "rickMortyMap"),
    playerCreate(4, "emilyb", 213, "disneyMap"),
    playerCreate(5, "davidw123", 232, "pokemonMap"),
    playerCreate(6, "sarah_a", 123, "rickMortyMap"),
    playerCreate(7, "roberttaylor", 87, "pokemonMap"),
    playerCreate(8, "jennifer123", 43, "disneyMap"),
    playerCreate(9, "willm", 12, "pokemonMap"),
    playerCreate(10, "oliviam", 65, "rickMortyMap"),
  ]);
}

//! Character
// Create character function
async function characterCreate(index, character, posX, posY, map) {
  const characterN = new CharacterCollection({ character, posX, posY, map });
  await characterN.save();
  characterArr[index] = characterN;
  console.log(`Added character: ${characterN.character}`);
}

// Populate the locations
async function popCharacter() {
  console.log("Adding Character");
  await Promise.all([
    //Rick and Morty
    characterCreate(0, "Beth Smith", [1530, 1600], [435, 750], "rickMortyMap"),
    characterCreate(1, "Jerry Smith", [1160, 1240], [250, 530], "rickMortyMap"),
    characterCreate(2, "Summer Smith", [1345, 1415], [515, 1040], "rickMortyMap"),
    characterCreate(3, "Pencil", [805, 855], [390, 510], "rickMortyMap"),
    characterCreate(4, "Ham Samurai", [1025, 1135], [190, 390], "rickMortyMap"),
    characterCreate(5, "Flamingo", [1440, 1525], [215, 315], "rickMortyMap"),
    characterCreate(6, "FrankenSteinMonster", [290, 470], [400, 610], "rickMortyMap"),
    //Disney
    characterCreate(7, "Homer Simpson", [1530, 1600], [1530, 1600], "disneyMap"),
    characterCreate(8, "Simba", [1730, 1825], [410, 570], "disneyMap"),
    characterCreate(9, "Caption America", [1575, 1660], [345, 565], "disneyMap"),
    characterCreate(10, "Kermit", [1275, 1360], [400, 530], "disneyMap"),
    characterCreate(11, "Baby Yoda", [870, 955], [840, 925], "disneyMap"),
    characterCreate(12, "Goofy", [330, 415], [375, 445], "disneyMap"),
    //Pokemon
    characterCreate(13, "Blastoise", [500, 635], [350, 445], "pokemonMap"),
    characterCreate(14, "Pidgey", [95, 150], [600, 660], "pokemonMap"),
    characterCreate(15, "Snorlax", [280, 415], [460, 580], "pokemonMap"),
    characterCreate(16, "Charmander", [940, 990], [610, 670], "pokemonMap"),
    characterCreate(17, "Mew", [625, 760], [590, 690], "pokemonMap"),
    characterCreate(18, "Weedle", [1285, 1355], [395, 450], "pokemonMap"),

    // characterCreate(19, "I wish I could travel more.", player[1], character[3], true),
    // characterCreate(20, "Exploring new cities is so enriching.", player[3], character[3], false),
    // characterCreate(21, "The architecture in new cities is fascinating.", player[5], character[3], false),
    // characterCreate(22, "Tasting new foods is the best part of travel.", player[7], character[3], false),
    // characterCreate(23, "Meeting new people is the heart of adventure.", player[9], character[3], false),
    // characterCreate(24, "Cooking experiments are always fun!", player[2], character[4], false),
    // characterCreate(25, "Even when the recipe doesn't go as planned.", player[4], character[4], false),
    // characterCreate(26, "It's all about the journey in the kitchen.", player[6], character[4], false),
    // characterCreate(27, "Keep experimenting and having fun!", player[8], character[4], false),
    // characterCreate(28, "Movie night with friends is a blast!", player[1], character[5], true),
    // characterCreate(29, "Popcorn and laughter - perfect combo.", player[3], character[5], false),
    // characterCreate(30, "What movie did you watch?", player[5], character[5], false),
    // characterCreate(31, "Movie nights are the best nights.", player[7], character[5], false),
    // characterCreate(32, "Sounds like a great time with friends.", player[9], character[5], false),
    // characterCreate(33, "Hiking in the mountains sounds amazing!", player[0], character[6], false),
    // characterCreate(34, "The views must have been breathtaking.", player[2], character[6], false),
    // characterCreate(35, "Nature has a way of soothing the soul.", player[4], character[6], false),
    // characterCreate(36, "Did you spot any wildlife?", player[6], character[6], false),
    // characterCreate(37, "A day in the mountains is a day well spent.", player[8], character[6], false),
    // characterCreate(38, "Meeting Max must have been a joy!", player[1], character[7], false),
    // characterCreate(39, "Puppies bring so much happiness.", player[3], character[7], false),
    // characterCreate(40, "What breed is Max?", player[5], character[7], false),
  ]);
}
