import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import gateWayRoute from "../middleware/gateWayRoute.js";

const router = express.Router();

router.get("/:id", gateWayRoute,getMessages);
router.post("/send/:id", gateWayRoute, sendMessage);

export default router;