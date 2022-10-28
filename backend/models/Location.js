import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const location = new Schema({
    location: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    is_deliver: {
        type: Boolean,
        required: true
    }

})

const Location = model("locations", location);
export default Location;