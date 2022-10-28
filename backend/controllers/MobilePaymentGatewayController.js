import express from "express";
import JWT from "jsonwebtoken";
import nodefetch from "node-fetch";
import * as dot_env from "dotenv";
import MobilePayGateway from "../models/MobilePaymentGateway"
import OTP_Helper from "../Helpers/OTPHelper"
dot_env.config();


const PrifixToken = process.env.OTP_TOKEN_PREFIX;
const SuffixToken = process.env.OTP_TOKEN_SUFFIX;


async function GetmobilePaymentGateway (req, res)  {
  try {
    const data = await MobilePayGateway.find();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
};

function mobilenumber (req, res)  {
  var Number = req.params.mobileNo;

  MobilePayGateway.find({ mobileNo: Number })
    .then((x) => {
      if (x.length != 1) {
        res.statusCode = 404;
        res.send();
      } else if (
        req.params.mobileNo == x[0].mobileNo &&
        req.body.accNo == x[0].accNo &&
        req.body.NIC == x[0].NIC &&
        req.body.accHolderName == x[0].accHolderName
      )
       {
        OTP_Helper.getOTP(req)
          .then((theotp) => {
            const mobileNum = req.params.mobileNo;
            let OTPKey = PrifixToken + mobileNum + req.body.accNo + SuffixToken;
           
            const theToken = JWT.sign(theotp, OTPKey);

            const SMSService= "http://172.18.0.1:8280/payment/sms";
            const Body = {
              data: x,
              message: "Use This OTP ",
              type: "OTP",
            };
            const headers = {
              "Content-Type": "application/json",
              Authorization: "OTPToken " + theToken,
            };

            const options = {
              method: "POST",
              headers: headers,
              body: JSON.stringify(Body),
            };
            nodefetch(SMSService, options)
              .then((Res) => {
                if (Res.status == 200) {
                  Res.json()
                    .then((result) => {
                      
                      res.statusCode = 200;
                      res.json({
                        MobilePaymentGateway: x,
                        Token: theToken,
                      });
                      res.send();
                    })
                   
                } else {
                  console.log(" Error in SMS service");
                  res.statusCode = 400;
                  res.send();
                }
              })
              
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.statusCode = 404;
        res.json(x);
      }
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 404;
    });
};

const checktheOTP = (req, res) => {
  try {
    

    if (req.body.OTP == req.OTP) {
    
      res.statusCode = 200;
      res.json(true);
    } else {
      res.statusCode = 400;
      res.json(false);
    }
  } catch (err) {
    console.log(err);
  }
};

function PostmobilePayGateway  (req, res) {
  const entry = new MobilePayGateway({
    accHolderName: req.body.accHolderName,
    mobileNo: req.body.mobileNo,
    accNo: req.body.accNo,
    NIC: req.body.NIC,
    email: req.body.email,
  });

  entry
    .save()
    .then((d) => {
      res.json(d);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

module.exports = {
  GetmobilePaymentGateway,
  mobilenumber,
  checktheOTP,
  PostmobilePayGateway,
};
