
import { Express } from 'express';
import  Jwt  from 'jsonwebtoken';
import * as dot_env from "dotenv";
dot_env.config();

const prifix_token = process.env.OTP_TOKEN_PREFIX;
const Suffix_token = process.env.OTP_TOKEN_SUFFIX;


function auth_token(req , res , next){
    
    const auth_header = req.headers['authorization']
    const thetoken = auth_header && auth_header.split(' ')[1]
    if(thetoken == null) {
        return res.sendStatus(403)
    }
    
    let OTP_Key = prifix_token + req.body.mobileNo + req.body.accNo + Suffix_token;
   
    Jwt.verify(thetoken , OTP_Key , (error , _OTP) => {
        if(error) {
             res.sendStatus(403)
            }
       
        req.OTP = _OTP
        next()
    })
}

module.exports = auth_token;