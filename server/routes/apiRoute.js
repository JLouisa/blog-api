const express = require("express");
const router = express.Router();
const { isAuth, isAdmin, isMember } = require("../config/auth");
const apiControllerGet = require("../controllers/apiControllerGet");
const apiControllerPost = require("../controllers/apiControllerPost");
const apiControllerPut = require("../controllers/apiControllerPut");
const apiControllerDelete = require("../controllers/apiControllerDelete");

//! CRUD Operations API

// GET
router.get("/users", isAuth, isAdmin, apiControllerGet.apiUserGet);
router.get("/user/:id", apiControllerGet.apiUserIDGet);
router.get("/blogs", apiControllerGet.apiBlogsGet);
router.get("/blog/:id/comments", apiControllerGet.apiCommentGet);
router.get("/blog/:id", apiControllerGet.apiBlogsIDGet);

// POST
router.post("/user", apiControllerPost.apiUserPost);
router.post("/blog", isAuth, isAdmin, apiControllerPost.apiBlogPost);
router.post("/blog/:id/comment", isAuth, isMember, apiControllerPost.apiCommentPost);

// PUT
router.put("/user/:id/password", apiControllerPut.apiUserIDPassPut); //Needs to be updated
router.put("/user/:id/admin", apiControllerPut.apiUserIDAdminPutToggle); //Needs to be updated
router.put("/blog/:id", apiControllerPut.apiBlogIDPut);
router.put("/comment/:id", apiControllerPut.apiCommentIDPut);

// DELETE
router.delete("/user/:id", apiControllerDelete.apiUserIDDeleteToggle);
router.delete("/blog/:id", apiControllerDelete.apiBlogIDDeleteToggle);
router.delete("/comment/:id", apiControllerDelete.apiCommentIDDeleteToggle);

module.exports = router;
