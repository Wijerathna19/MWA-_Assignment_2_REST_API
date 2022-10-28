import express from "express";
import nodefetch from "node-fetch";
import payment from "../models/Payment";

const router = express.Router();


async function Getpayment (req, res) {
  try {
    const payment = await payment.find();
    res.json(payment);
  } catch (error) {
    res.json({ message: error });
  }
};



function Postpayment (req, res)  {
  const payment = new payment({
    orderId: req.body.orderId,
    userId: req.body.userId,
    cardNo: req.body.cardNo,
    Ammount: req.body.Ammount,
    accNo: req.body.accNo,
    type: req.body.type,
  });


  payment.save()
    .then((info) => {
      if (req.body.isMobile == true) {
        const SMSService = "http://172.18.0.1:8280/payment/sms";
        const Body = {
          toNumber: req.body.mobileNo,
          message:
            "  The payment is made via mobile payments \n Order : " +
            req.body.orderId +
            " \n The ammount =  " +
            req.body.Ammount +
            "$ ",
          type: "PAYMENT",
        };
        const Headers = { "Content-Type": "application/json" };

        const Options = {
          method: "POST",
          headers: Headers,
          body: JSON.stringify(Body),
        };
        nodefetch(SMSService, Options)
          .then((Res) => {
            if (Res.status == 200) {
              Res.json()
                .then((result) => {
                  console.log(result);
                 
                  res.statusCode = 200;
                  res.json(info);
                  res.send();
                })
                .catch((err) => console.log(" Error : ", err));
            } else {
              console.log("--- Error in the SMS Service ---");
              res.json(info);
              res.statusCode = 400;
              res.send();
            }
          })
          .catch((err) => {
            console.log("--- Error in the SMS Service (other)--- : ", err);
            res.json(info);
            res.statusCode = 400;
            res.send();
          });
      } else {
        const EmailService = "http://172.18.0.1:8280/payment/email";
        const Body = {
          toAddress: req.body.email,
          message: " you have made the payment through card payments",
          type: "PAYMENT",
          Ammount: req.body.Ammount,
          orderId: req.body.orderId,
        };
        const ApiHeaders = { "Content-Type": "application/json" };

        const ApiOptions = {
          method: "POST",
          headers: ApiHeaders,
          body: JSON.stringify(Body),
        };
        nodefetch(EmailService, ApiOptions).then((Res) => {
            if (Res.status == 200) {
              Res.json()
                .then((result) => {
                  console.log(result);
                  console.log("-- sent... -");
                  res.statusCode = 200;
                  res.json(info);
                  res.send();
                })
                
            } else {
              console.log("!! error !! in email server");
              res.statusCode = 400;
              res.json(info);
              res.send();
            }
          })
          
      }
    })
    .catch((err) => {
      res.statusCode = 400;
      res.json(err);
      console.log(err);
    });
};

module.exports = { Getpayment, Postpayment };
