import { Router } from "express";
const router = Router();

import { locationGet, locationPost } from "../controllers/LocationController";

router.get("/", locationGet);

router.post("/", locationPost);

export default router;
