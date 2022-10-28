import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const buyer = new Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwd: {
        type: String,
        required: true
    },
    profile_img: {
        type: String,
        required: false
    }

})

const Buyer = model("buyer", buyer);
export default Buyer;