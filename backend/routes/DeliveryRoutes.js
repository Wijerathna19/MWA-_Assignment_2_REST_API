import { Router } from "express";
const router = Router();
import "dotenv/config";

import { deliveryGet, deliveryPost, pending, deliveryPatch } from "../controllers/DeliveryController";

router.get("/", deliveryGet);
router.post("/", deliveryPost);
router.get("/pending", pending);
router.patch("/:id", deliveryPatch);

export default router;
