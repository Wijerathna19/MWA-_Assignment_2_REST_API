const router = require("express").Router();
import Seller, { findOne } from "../models/Seller";
import Buyer, { findOne as _findOne } from "../models/Buyer";
import multer, { diskStorage } from "multer";
import { genSalt, hash as _hash } from "bcrypt";

import { seller_login, buyer_login, get_seller } from "../controllers/UserController";

const storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", upload.single("picture"), async (req, res) => {
  if (req.body.role === "Seller") {
    const auth = await findOne({ email: req.body.email });

    if (auth) {
      res.json({ status: 500 });
    } else {
      const salt = await genSalt();
      const hash = await _hash(req.body.password, salt);
      const user = new Seller({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        profileImg: req.file.originalname,
      });

      user
        .save()
        .then(() => {
          res.json({ status: 200 });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else if (req.body.role === "Buyer") {
    const auth = await _findOne({ email: req.body.email });

    if (auth) {
      res.json({ status: 500 });
    } else {
      const salt = await genSalt();
      const hash = await _hash(req.body.password, salt);

      const user = new Buyer({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        profileImg: req.file.originalname,
      });

      user
        .save()
        .then(() => {
          res.json({ status: 200 });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

router.post("/seller-login", seller_login);
router.post("/buyer-login", buyer_login);
router.get("/:sellerID", get_seller);

export default router;
