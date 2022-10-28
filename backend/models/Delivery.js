import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const delivery = new Schema({
    user_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    response_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    del_add: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    loc_type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    del_cost: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Array,
        required: true
    }

})

const Delivery = model("delivery", delivery);
export default Delivery;