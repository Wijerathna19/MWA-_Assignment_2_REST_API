import { Router } from "express";
const router = Router();
require("dotenv").config();

import { mobilePaymentGatewayGet, mobileNo, checkOTP, mobilePaymentGatewayPost } from "../controllers/MobilePaymentGatewayController";

router.get("/", mobilePaymentGatewayGet);
router.get("/:mobileNo", mobileNo);
router.post("/checkOTP/confirmation", checkOTP);
router.post("/", mobilePaymentGatewayPost);

export default router;
