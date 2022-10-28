import { Router } from "express";
const router = Router();

import { cartGet, cartPost } from "../controllers/CartController";

//get all items
router.get("/", cartGet);
router.post("/", cartPost);

export default router;
