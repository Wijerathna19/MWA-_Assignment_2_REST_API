import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const mobile_payment_gateway = new Schema({
    acc_holder_name: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    acc_no: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }

})

const MobileGateway = model("mobile_payment_gateway", mobile_payment_gateway);
export default MobileGateway;