import Express  from 'express';
import JWT from 'jsonwebtoken';


function auth_token(req , res , next){
  
    
    const auth_header = req.headers['authorization']
    const _token = auth_header && auth_header.split(' ')[1]
    if(_token == null) {
        return res.sendStatus(403)
    }

   
    JWT.verify(_token , '234223990178054578' , (error , _OTP) => {
        if(error) {
            return res.sendStatus(403)
        }
       
        req.OTP = _OTP
        next()
    })
}

module.exports = auth_token;