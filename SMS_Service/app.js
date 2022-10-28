import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";
import authToken from "./Helpers/TokenMiddlewareHelper";
import 'dotenv/config';

const app = express()

const twilio_sid = process.env.TWILIO_SID;
const twilio_auth_token = process.env.TWILIO_AUTH_TOKEN;
var sender_nO = process.env.PHONE_NO;

var client = new twilio(twilio_sid, twilio_auth_token);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', authToken, (reqest, response) => {
    // Message configuration
    let message = null;

    switch (reqest.body.type) {
        // For OTP
        case "OTP":
            let toNumber = reqest.body.data[0].mobileNo;
            client.messages.create({
                body: reqest.body.message + ' : ' + reqest.OTP,
                to: toNumber,
                from: sender_nO,
            })
                .then((message) => {
                    this.smsResponse = message;
                    response.statusCode = 200;
                    response.json({ status: true, TWResponse: this.smsResponse });
                    response.send();
                })
                .catch((error) => {
                    response.statusCode = 400;
                    response.json({ status: true, TWResponse: this.smsResponse });
                    response.send();
                })
            break;
        // For Payment
        case "PAYMENT":
            client.messages.create({
                body: 'Mart - Payment Confirmation  \n' + reqest.body.message,
                to: reqest.body.toNumber,
                from: sender_nO,
            })
                .then((message) => {
                    this.smsResponse = message;
                    response.statusCode = 200;
                    response.json({ status: true, TWResponse: this.smsResponse });
                    response.send();
                })
                .catch((error) => {
                    response.statusCode = 400;
                    response.json({ status: true, TWResponse: this.smsResponse });
                    response.send();
                })
            break;
        default:
            response.statusCode = 400;
            response.send();
    }

})

app.listen(9002)
console.log(`SMS Service Started..!`)
console.log(`Server is listening on port 9002...`);
