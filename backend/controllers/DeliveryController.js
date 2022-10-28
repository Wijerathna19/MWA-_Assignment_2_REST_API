
import express from "express";
import * as dot_env from "dotenv";
import delivery_item from "../models/Delivery"
import NodeMailer from "nodemailer"
dot_env.config();




async function delivery_get  (req, res) {
  try {
    const items = await delivery_item.find();
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
};

const deliveryPost = async (req, res) => {
  const the_item = new delivery_item({
    username: req.body.username,
    userId: req.body.userId,
    resName: req.body.resName,
    phone: req.body.phone,
    delAdd: req.body.delAdd,
    city: req.body.city,
    locType: req.body.locType,
    date: new Date(req.body.date),
    comments: req.body.comments,
    delCost: req.body.delCost,
    email: req.body.email,
    status: [req.body.status],
  });

  the_item.save().then((d) => {
      res.json(d);
    })
    .catch((err) => {
      res.json(err);
    });

  var sender = NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  var mail_options = {
    from: process.env.EMAIL,
    to: the_item.email,
    subject: "the Delivery reciept",
    text:
      "the Order has been places successfull on " +
      the_item.date +
      ". the total cost is Rs." +
      the_item.delCost 
  };

  sender.sendMail(mail_options);
};

async function pending_  (req, res) {
  try {
    const theitems = await delivery_item.find();
    const list = [];
    theitems.forEach((item) => {
      item.status[theitems.length - 1] !== "Deliverd!"
        ? list.push(item)
        : list.push();
    });
    res.json(list);
  } catch (error) {
    res.json({ message: error });
  }
};

async  function delivery_patch (req, res) {
  try {
    const updated_post = await delivery_item.updateOne(
      { _id: req.params.id },
      { $set: { status: req.body.status } }
    );
    res.json(updated_post);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { delivery_get, deliveryPost, pending_, deliveryPatch };
