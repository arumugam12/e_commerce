import mongoose from "mongoose";
import User from "../../user/model/user.model.js";
import Cart from "../../cart/model/cart.model.js";
import Product from "../../product/model/product.model.js";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    cart_items: {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Prdouct"
        },
        product_name: { type: String, default: " " },
        quantity: { type: Number, default: " " },
        price: { type: Number, default: " " },
    },
    address_info: {
        address_id: { type: String, default: " " },
        address: { type: String, default: " " },
        city: { type: String, default: " " },
        state: { type: String, default: " " },
        country: { type: String, default: " " },
        pincode: { type: Number, default: " " },
    },
    order_status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    order_date: { type: Date, default: " " },
    delivery_date: { type: Date, default: " " },
    total_amount: { type: Number, default: " " }
});

const Order = mongoose.model("order", orderSchema);
export default Order;