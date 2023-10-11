"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = __importDefault(require("./postsController"));
const router = express_1.default.Router();
router.get("/load/id", postsController_1.default.getAllPostsId);
router.get("/load/main/:page", postsController_1.default.getMainPosts);
router.get("/load/categoryLength", postsController_1.default.getCategoryPostsCount);
router.get("/load/length/:category", postsController_1.default.getPostsLength);
router.get("/load/:category/:page", postsController_1.default.getCategoryPosts);
router.get("/load/all", postsController_1.default.getAllPosts);
router.get("/series/:seriesTitle/:page", postsController_1.default.getSeriesPosts);
router.get("/search/:keyword/:page", postsController_1.default.getPostsBySearchKeyWord);
router.get("/tag/:keyword/:page", postsController_1.default.getPostsByTag);
exports.default = router;