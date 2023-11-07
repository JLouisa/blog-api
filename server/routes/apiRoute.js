const express = require("express");
const router = express.Router();
const apiControllerGet = require("../controllers/apiControllerGet");
const apiControllerPost = require("../controllers/apiControllerPost");
const apiControllerPut = require("../controllers/apiControllerPut");
const apiControllerDelete = require("../controllers/apiControllerDelete");

//! CRUD Operations API

// GET
router.get("/users", apiControllerGet.apiUserGet);
router.get("/user/:id", apiControllerGet.apiUserIDGet);
router.get("/blogs", apiControllerGet.apiBlogsGet);
router.get("/blog/:id/comments", apiControllerGet.apiCommentGet);
router.get("/blog/:id", apiControllerGet.apiBlogsIDGet);

// POST
router.post("/user", apiControllerPost.apiUserPost);
router.post("/blog", apiControllerPost.apiBlogPost);
router.post("/blog/:id/comment", apiControllerPost.apiCommentPost);

// PUT
router.put("/user/:id/password", apiControllerPut.apiUserIDPassPut); //Needs to be updated
router.put("/blog/:id", apiControllerPut.apiBlogIDPut);
router.put("/comment/:id", apiControllerPut.apiCommentIDPut);

// DELETE
router.delete("/user/:id", apiControllerDelete.apiUserIDDeleteToggle);
router.delete("/blog/:id", apiControllerDelete.apiBlogIDDeleteToggle);
router.delete("/comment/:id", apiControllerDelete.apiCommentIDDeleteToggle);

module.exports = router;
