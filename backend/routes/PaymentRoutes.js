import { Router } from "express";
const router = Router();

import { paymentGet, paymentPost } from "../controllers/PaymentController";

router.get("/", paymentGet);
router.post("/", paymentPost);

export default router;
