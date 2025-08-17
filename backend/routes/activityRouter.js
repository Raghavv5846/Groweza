import express from "express";

import { authenticate } from "../middleWare/authMiddleware.js";
import { createActivity, getActivities } from "../controller/activityController.js";


const router = express.Router();

router.get("/", authenticate, getActivities);
router.post("/", authenticate, createActivity);

export default router;
