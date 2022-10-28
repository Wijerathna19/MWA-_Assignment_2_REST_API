import express from 'express';
const app = express()
import { connect } from 'mongoose';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

//Import Routes
import buyer_router from './routes/BuyerRoute.js';
import card_payment_gateway_router from './routes/CardPaymentGatewayRoutes';
import cart_router from './routes/CartRoutes.js';
import delivery_routes from './routes/DeliveryRoutes';
import item_router from './routes/ItemRoute.js';
import locations_router from './routes/LocationRoutes';
import mobile_payment_gateway_router from './routes/MobilePaymentGatewayRoutes';
import payment_router from './routes/PaymentRoutes';
import user_router from './routes/UserRoute.js';


//Middleware
app.use(json());
app.use(cookieParser('sec'));
app.use(cors());
app.use(express.static('uploads'));
app.use(urlencoded({ extended: true }))


//Set routes
app.use("/buyer", buyer_router);
app.use("/cardPayment", card_payment_gateway_router);
app.use("/cart", cart_router);
app.use('/delivery', delivery_routes);
app.use("/item", item_router);
app.use("/locations", locations_router);
app.use("/mobilePayment", mobile_payment_gateway_router);
app.use("/Payment", payment_router);
app.use("/user", user_router);
app.use(express.static('uploads'))


// database connection 
connect(
    process.env.DB_CONNECTION,

    {useNewUrlParser: true , useUnifiedTopology:true},
    () =>
        console.log("connected....."),

    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to the database")

    }
)


//server start
app.listen(9000);
