const express = require("express");
const router = express.Router();
const waldoController = require("../../controllers/waldo/waldoController");

/* GET 3 random characters page. */
router.get("/character/:id", waldoController.characterGet);

/* Get leaderboard */
router.get("/leaderboard", waldoController.leaderboardGet);

/* POST leaderboard player */
router.post("/leaderboard", waldoController.leaderboardPost);

module.exports = router;
