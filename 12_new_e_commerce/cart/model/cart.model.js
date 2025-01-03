import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    createdAt: {
        type : Date,
        default : Date.now
    }
});

const Cart = new mongoose.model("cart", cartSchema);
export default Cart;