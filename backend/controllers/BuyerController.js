const router = require("express").Router();
import { find } from "../models/Item";


const buyer_get = (req, res) => {
  find()
    .then((i) => {
      res.status(200).json(i);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};

export default { buyer_get };
