const router = require("express").Router();

import { buyerGet } from "../controllers/BuyerController";

router.get("/", buyerGet);

export default router;
