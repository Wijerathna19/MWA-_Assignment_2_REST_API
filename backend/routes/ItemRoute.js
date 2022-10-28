const router = require("express").Router();
import Item, { findByIdAndUpdate } from "../models/Item";
import multer, { diskStorage } from "multer";

import { sellerID, itemID, deleteItemID } from "../controllers/ItemController";

const storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

//uploading images
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), (req, res) => {
  const item = new Item({
    sellerID: req.body.sellerID,
    title: req.body.title,
    description: req.body.description,
    itemCount: req.body.count,
    price: req.body.price,
    itemImage: req.file.originalname,
  });

  item
    .save()
    .then(() => {
      res.json({ status: 200 });
    })
    .catch((err) => {
      console.log(err);
    });
});

//getting seller's items
router.get("/:sellerID", sellerID);

//get one item
router.get("/:sellerID/:itemID", itemID);

//update item
router.put("/update/:itemID", upload.single("image"), async (req, res) => {
  const itemID = req.params.itemID;
  let updatedItem;

  if (!req.file) {
    updatedItem = {
      title: req.body.title,
      description: req.body.description,
      itemCount: req.body.count,
      price: req.body.price,
    };
  } else {
    updatedItem = {
      title: req.body.title,
      description: req.body.description,
      itemCount: req.body.count,
      price: req.body.price,
      itemImage: req.file.originalname,
    };
  }

  const updateValue = await findByIdAndUpdate(itemID, updatedItem)
    .then(() => {
      res.json({ status: 200 });
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete an item
router.delete("/delete/:itemID", deleteItemID);

export default router;
