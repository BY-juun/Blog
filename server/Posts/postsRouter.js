const express = require("express");
const router = express.Router();
const postsController = require("./postsController");

router.get("/load/main/:page", postsController.getMainPosts);

router.get("/load/categoryLength", postsController.getCategoryPostsCount);

router.get("/load/length/:category", postsController.getPostsLength);

router.get("/load/:category/:page", postsController.getCategoryPosts);

router.get("/search/:keyword", postsController.getPostsBySearchKeyWord);

router.get("/tag/:keyword", postsController.getPostsByTag);

router.get("/topViews", postsController.getTopViewsPosts);

module.exports = router;
