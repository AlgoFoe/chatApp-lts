import express from "express";
import gateWayRoute from "../middleware/gateWayRoute.js";

const router = express.Router();

router.get("/",gateWayRoute ,getUsersList);

export default router;