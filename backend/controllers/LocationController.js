import express from "express";
import location from "../models/Location";



async function Getlocation  (req, res)  {
  try {
    const allitems = await location.find();
    res.json(allitems);
  } catch (error) {
    res.json({ message: error });
  }
};

async function Postlocation  (req, res) {
  const theitem = new location({
    location: req.body.location,
    province: req.body.province,
    cost: req.body.cost,
    isDeliver: req.body.isDeliver,
  });

  theitem
    .save()
    .then((info) => {
      res.json(info);
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = { Getlocation, Postlocation };
