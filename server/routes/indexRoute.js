const express = require("express");
const router = express.Router();
const { isAuth } = require("../config/auth");
const loginController = require("../controllers/loginController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Blog API" });
});

/* POST login */
router.post("/login", loginController.loginPost);

/* POST Logout */
router.post("/logout", loginController.logoutPost);

module.exports = router;
