import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const cart = new Schema({
    items: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    buyer_id: {
        type: String,
        required: true
    }


})

const Cart = model("cart", cart);
export default Cart;