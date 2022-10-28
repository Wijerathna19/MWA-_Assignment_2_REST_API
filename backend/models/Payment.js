import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const payment = new Schema({
    order_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    card_no: {
        type: String,
        required: false
    },
    ammount: {
        type: Number,
        required: true
    },
    acc_no: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    }

})

const Payment = model("payment", payment);
export default Payment;