import express from "express";
import JWT from "jsonwebtoken";
import _fetch from "node-fetch";
import * as dot_env from "dotenv";
dot_env.config();
import Card_paygateway from "../models/CardPaymentGateway";
import OTP_Helper from "../Helpers/OTPHelper";


const prifixtoken = process.env.OTP_TOKEN_PREFIX;
const suffixtoken = process.env.OTP_TOKEN_SUFFIX;


async function  card_paygatewayGet(req, res) {
  try {
    const _cards = await Card_paygateway.find();
    res.json(_cards);
  } catch (err) {
    res.json({ message: err });
  }
};

function card_no (req, res) {
  let _cNo = req.params.cardNo;

  Card_paygateway.find({ cardNo: _cNo })
    .then((Card_paygateway) => {
      if (Card_paygateway.length != 1) {
        res.statusCode = 404;
        res.send();
      } else if (
        req.params.cardNo == Card_paygateway[0].cardNo &&
        req.body.cardHolderName == Card_paygateway[0].cardHolderName &&
        req.body.CVC == Card_paygateway[0].CVC &&
        req.body.expDate == Card_paygateway[0].expDate
      ) {
        OTP_Helper.get_OTP(req)
          .then((data) => {
            const card_No = req.params.cardNo;
            let OTP_Key = prifixtoken + card_No + req.body.CVC + suffixtoken;
           
            const OTP_Token = JWT.sign(data, OTP_Key);

            const theemailservice = "http://172.18.0.1:8280/payment/email";
            const Api_Body = {
              data: Card_paygateway,
              message: "Use this OTP ",
              type: "OTP",
            };
            let Api_Headers = {
              "Content-Type": "application/json",
              Authorization: "OTP_Token " + OTP_Token,
            };

            const Api_Options = {
              method: "POST",
              headers: Api_Headers,
              body: JSON.stringify(Api_Body),
            };
            _fetch(theemailservice, Api_Options)
              .then((email) => {
                if (email.status == 200) {
                  email.json()
                    .then((email_result) => {
                      
                      res.statusCode = 200;
                      res.json({
                        Card_paygateway: Card_paygateway,
                        Token: OTP_Token,
                      });
                      res.send();
                    })
                    
                } else {
                  
                  res.statusCode = 400;
                  res.send();
                }
              })
              .catch((error) => {
                console.log("Error in email service : ", error);
                res.statusCode = 400;
                res.send();
              });
          })
          .catch((error) => {
            console.log(err);
          });
      } else {
       
        res.statusCode = 404;
        res.json(Card_paygateway);
      }
    })
    .catch((error) => {
      console.log(error);
      res.statusCode = 404;
    });
};

function check_OTP  (req, res)  {
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

async function card_payatewayPost (req, res) {
  const thecard = new Card_paygateway({
    cardHolderName: req.body.cardHolderName,
    cardNo: req.body.cardNo,
    CVC: req.body.CVC,
    type: req.body.type,
    expDate: req.body.CVC,
    email: req.body.email,
    phone: req.body.phone,
  });

  thecard.save().then(
    (d) => {
    
      res.json(d);
    })
    .catch((error) => {
      res.json(error);
      console.log(error);
    });
};

module.exports = {
  card_paygatewayGet,
  card_no,
  check_OTP,
  card_payatewayPost,
};
