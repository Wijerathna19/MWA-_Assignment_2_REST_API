import jwt from "jsonwebtoken";
import 'dotenv/config';

const token_prifix = process.env.OTP_TOKEN_PREFIX;
const token_suffix = process.env.OTP_TOKEN_SUFFIX;

//decrypt and autherize the JWT
function authToken(reqest, response, next) {
    if (reqest.body.type == "PAYMENT") {
        next();
    }
    else {
        //filter token
        const authHeader = reqest.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return response.sendStatus(403)
        let OTPKey = token_prifix + reqest.body.data[0].mobileNo + reqest.body.data[0].accNo + token_suffix;

        //decrypt the token
        jwt.verify(token, OTPKey, (err, OTP) => {
            if (err) {
                return response.sendStatus(403);
            }
            reqest.OTP = OTP
            next()
        })
    }

}

module.exports = authToken;