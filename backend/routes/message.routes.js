import express from "express";
import { sendMessage, getMessages, getConversations } from "../controllers/message.controller.js";
import gateWayRoute from "../middleware/gateWayRoute.js";

const router = express.Router();

router.get("/conversations", gateWayRoute,getConversations);
router.get("/:id", gateWayRoute,getMessages);
// router.get("/conversation/:id", gateWayRoute,getChatConversation);
router.post("/send/:id", gateWayRoute, sendMessage);

export default router;  