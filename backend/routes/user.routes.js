import express from "express";
import gateWayRoute from "../middleware/gateWayRoute.js";
import { getUsersList,getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",gateWayRoute ,getUsersList);
router.get("/profile/:query",getUserProfile);
export default router;