import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const card_payment_gateway = new Schema({
    card_holder_name: {
        type: String,
        required: true
    },
    card_no: {
        type: String,
        required: true
    },
    cvc: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    expir_date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    }

})

const CardGateway = model("card_payment_gateway", card_payment_gateway);
export default CardGateway;