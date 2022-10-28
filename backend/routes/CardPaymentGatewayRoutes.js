import { Router } from "express";
require("dotenv").config();
const router = Router();

import { cardPaymentGatewayGet, cardNo, checkOTP, cardPaymentGatewayGetPost } from "../controllers/CardPaymentGatewayController";

import authToken from "../Helpers/TokenMiddlewareHelper";

router.get("/", cardPaymentGatewayGet);
router.post("/:cardNo", cardNo);
router.post("/checkOTP/confirmation", authToken, checkOTP);
router.post("/", cardPaymentGatewayGetPost);

export default router;
