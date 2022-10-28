import express from "express";
import bodyParser from "body-parser";
import sendGridMail from "@sendgrid/mail";
import authToken from "./Helpers/TokenMiddlewareHelper";
import 'dotenv/config';

const app = express()

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', authToken, (request, response) => {
    // Message configuration
    let message = null;

    switch (request.body.type) {
        case "OTP":
            message = {
                to: request.body.data[0].email,
                from: 'ucsc.testprojects@gmail.com',
                subject: 'Mart - OTP',
                text: 'Your OTP For Payment is : ' + request.OTP,
                html: '<p>' + request.body.message + ' : ' + request.OTP + '  </p>'
            }
            break;
        case "PAYMENT":
            message = {
                to: request.body.toAddress,
                from: 'ucsc.testprojects@gmail.com',
                subject: 'Mart - Payment Confirmation',
                text: 'Payment Made to Lorem-E-Shop : Order No : ' + request.body.orderId + ' , Ammount :  ' + request.body.Ammount,
                html: '<div><h1> Payment Confirmation for order ' + request.body.orderId +
                    '</h1><p>' + request.body.message + ' Ammount = $' + request.body.Ammount + '</p> </div>'
            }
            break;
        default:
            response.statusCode = 400;
            response.json({ status: true, SGResponse: this.mailResponse });
            response.send();

    }


    //Send email
    sendGridMail.send(message)
        .then((response) => {
            this.mailResponse = response;
            response.statusCode = 200;
            response.json({ status: true, SGResponse: this.mailResponse });
            response.send();
        })
        .catch((err) => {
            this.mailResponse = err;
            response.statusCode = 400;
            response.json({ status: true, SGResponse: this.mailResponse });
            response.send();
        });
})


app.listen(9001)
console.log(`Email Service Started..!`)
console.log(`Server is listening on port 9001...`);
