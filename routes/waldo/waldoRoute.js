const express = require("express");
const router = express.Router();
const waldoController = require("../../controllers/waldo/waldoController");

/* GET home page. */
router.get("/character", waldoController.characterGet);

/* POST login */
router.get("/leaderboard", waldoController.leaderboardGet);

/* POST Logout */
router.post("/leaderboard", waldoController.leaderboardPost);

module.exports = router;
