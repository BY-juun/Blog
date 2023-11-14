import express from "express";
import visitorController from "./visitorController";
const router = express.Router();

router.get("/", visitorController.getVisitor);

export default router;
