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
    characterCreate(0, "Beth Smith", [77, 81], [30, 50], "rickMortyMap"),
    characterCreate(1, "Jerry Smith", [57, 62], [4, 30], "rickMortyMap"),
    characterCreate(2, "Summer Smith", [67, 72], [72, 94], "rickMortyMap"),
    characterCreate(3, "Pencil", [39, 41], [26, 38], "rickMortyMap"),
    characterCreate(4, "Ham Samurai", [52, 57], [-2, 23], "rickMortyMap"),
    characterCreate(5, "Flamingo", [75, 79], [1, 12], "rickMortyMap"),
    characterCreate(6, "FrankenSteinMonster", [10, 20], [18, 40], "rickMortyMap"),
    //Disney
    characterCreate(7, "Homer Simpson", [20, 24], [22, 28], "disneyMap"),
    characterCreate(8, "Simba", [90, 96], [26, 32], "disneyMap"),
    characterCreate(9, "Caption America", [82, 87], [55, 64], "disneyMap"),
    characterCreate(10, "Kermit", [64, 71], [83, 88], "disneyMap"),
    characterCreate(11, "Baby Yoda", [42, 47], [76, 79], "disneyMap"),
    characterCreate(12, "Goofy", [12, 17], [34, 37], "disneyMap"),
    //Pokemon
    characterCreate(13, "Blastoise", [22, 31], [29, 32], "pokemonMap"),
    characterCreate(14, "Pidgey", [-1, 3], [88, 91], "pokemonMap"),
    characterCreate(15, "Snorlax", [10, 17], [51, 55], "pokemonMap"),
    characterCreate(16, "Charmander", [46, 50], [93, 96], "pokemonMap"),
    characterCreate(17, "Mew", [29, 37], [40, 44], "pokemonMap"),
    characterCreate(18, "Weedle", [66, 70], [73, 76], "pokemonMap"),
    characterCreate(19, "Starmie", [65, 71], [44, 46], "pokemonMap"),
    characterCreate(20, "Pichu", [84, 88], [51, 54], "pokemonMap"),
    characterCreate(21, "Goldeen", [5, 9], [62, 64], "pokemonMap"),
    characterCreate(22, "Magneton", [53, 59], [3, 7], "pokemonMap"),
    //Disney
    characterCreate(23, "Dark Vader", [25, 30], [75, 84], "disneyMap"),
    characterCreate(24, "Moana", [34, 38], [52, 59], "disneyMap"),
    characterCreate(25, "Phineas Flynn", [45, 50], [12, 15], "disneyMap"),
    characterCreate(26, "Thanos", [89, 96], [46, 59], "disneyMap"),
    //Rick and Morty
    characterCreate(27, "Ballon Dog", [17, 25], [60, 74], "rickMortyMap"),
    characterCreate(28, "Rick", [40, 48], [51, 83], "rickMortyMap"),
    characterCreate(29, "Morty", [48, 54], [28, 51], "rickMortyMap"),
    characterCreate(30, "Mrs. Refrigerator", [15, 28], [72, 95], "rickMortyMap"),
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
