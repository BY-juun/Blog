import express from "express";
import snippetsController from "./snippetController";
import { cacheClearMiddleWare, cacheMiddleware, isAdmin } from "@middleware";

const router = express.Router();

router.get("/load/id", snippetsController.getAllSnippetsId);

router.get("/load/all", cacheMiddleware(), snippetsController.getAllSnippets);

router.post(
  "/",
  isAdmin,
  cacheClearMiddleWare("snippet"),
  snippetsController.addSnippet
);

router.get("/load/:snippetId", snippetsController.getSnippet);

router.patch(
  "/:snippetId",
  isAdmin,
  cacheClearMiddleWare("snippet"),
  snippetsController.updateSnippet
);

router.delete(
  "/:snippetId",
  isAdmin,
  cacheClearMiddleWare("snippet"),
  snippetsController.deleteSnippet
);

export default router;
