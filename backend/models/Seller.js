import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const seller = new Schema({
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

const Seller = model("Seller", seller);
export default Seller;