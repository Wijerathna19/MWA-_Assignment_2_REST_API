import sg_mail from '@sendgrid/mail';
import * as dot_env from "dotenv";
dot_env.config();


sg_mail.setApiKey(process.env.SENDGRID_API_KEY);

const send_mail = (address , _OTP) =>{
    let mail_response = null;
    const message = {
        to: address,
        from: 'ucsc@gmail.com',
        subject: 'OTP From HRM E Shop',
        text: _OTP,
        html: '<h2> Your OTP : '+ _OTP +'  </h2>'
    }


    sg_mail.send(message)
    .then((res) => {
       
        this.mail_response = res;
        return Promise.resolve(this.mail_response) ;
    })
    .catch((err) => {
        
         this.mail_response = err;
         return Promise.resolve(this.mail_response) ;
    });
    return Promise.resolve(this.mail_response) ;
}

module.exports = send_mail;

