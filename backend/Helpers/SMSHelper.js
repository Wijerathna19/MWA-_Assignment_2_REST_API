import * as dot_env from "dotenv";
import  twilio from "twilio";
dot_env.config();


const _twilioSid = process.env.TWILIO_SID;
const _token = process.env.TWILIO_AUTH_TOKEN;
var sender_no = process.env.PHONE_NO;

var client = new twilio(_twilioSid , _token);


const send_SMS = (number , _OTP) => {
    client.messages.create({
        body: 'Use This OTP : ' + _OTP,
        to: number,
        from: sender_no,
    })
    .then((msg) => {
        
         return Promise.resolve(msg)
    })
    .catch((err) => {
        
        return Promise.reject(err);
    })
}

module.exports = send_SMS;