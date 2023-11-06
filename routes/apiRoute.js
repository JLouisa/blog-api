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
router.get("/blog/:id", apiControllerGet.apiBlogsIDGet);
router.get("/comments", apiControllerGet.apiCommentGet);

// POST
router.post("/user", apiControllerPost.apiUserPost);
router.post("/blog", apiControllerPost.apiBlogPost);
router.post("/blog/:id/comment", apiControllerPost.apiCommentPost);

// PUT
router.put("/user/:id", apiControllerPut.apiUserIDPut);
router.put("/blog/:id", apiControllerPut.apiBlogIDPut);
router.put("/comment/:id", apiControllerPut.apiCommentIDPut);

// DELETE
router.delete("/user/:id", apiControllerDelete.apiUserIDDelete);
router.delete("/blog/:id", apiControllerDelete.apiBlogIDDelete);
router.delete("/comment/:id", apiControllerDelete.apiCommentIDDelete);

module.exports = router;
