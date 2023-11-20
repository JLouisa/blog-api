const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const PlayerCollection = require("../../models/waldo/playerModel");
const CharacterCollection = require("../../models/waldo/characterModel");

// Init fake DB
exports.characterGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  const randomCharacters = await CharacterCollection.aggregate([{ $match: { map: ID } }, { $sample: { size: 3 } }]);
  res.status(200).json({ data: randomCharacters, ok: "ok" });
});

exports.leaderboardGet = asyncHandler(async function (req, res, next) {
  try {
    const [rickMortyMap, pokemonMap, disneyMap] = await Promise.all([
      PlayerCollection.find({ map: "rickMortyMap" }).sort({ score: 1 }).exec(),
      PlayerCollection.find({ map: "pokemonMap" }).sort({ score: 1 }).exec(),
      PlayerCollection.find({ map: "disneyMap" }).sort({ score: 1 }).exec(),
    ]);
    const leaderboard = [
      { map: disneyMap, name: "Disney Waldo" },
      { map: rickMortyMap, name: "Rick & Morty Waldo" },
      { map: pokemonMap, name: "Pokemon Waldo" },
    ];
    res.status(200).json({ data: leaderboard, ok: "ok" });
  } catch (error) {
    console.error("Error in leaderboardGet:", error);
    res.status(500).json({ data: ["Problem retrieving leaderboard"] });
  }
});

exports.leaderboardPost = [
  // Validate and sanitize the post fields.
  body("name")
    .notEmpty()
    .withMessage("Name field must not be empty")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name field must be between 2 and 50 characters")
    .escape(),
  body("score").notEmpty().withMessage("score field must not be empty").trim().escape(),
  body("map").notEmpty().withMessage("map field must not be empty").trim().escape(),

  // Process request after validation and sanitization.
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty() || req.body.map === "home") {
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(400).json({
        data: { message: "Validation failed, player not saved!" },
        input: {
          name: req.body.name,
          score: req.body.score,
          map: req.body.map,
        },
        errors: errors.array(),
      });
      return;
    } else {
      const newPlayer = new PlayerCollection({
        player: req.body.name,
        score: req.body.score,
        map: req.body.map,
      });
      await newPlayer.save();
      res.status(201).json({ data: { message: "Player succesfully posted on Leaderboard", ok: "ok" } });
    }
  }),
];
