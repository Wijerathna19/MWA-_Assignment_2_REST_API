import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const item = new Schema({

    seller_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    item_count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    item_img: {
        type: String,
        required: true
    }

})

const Item = model("item", item);
export default Item;