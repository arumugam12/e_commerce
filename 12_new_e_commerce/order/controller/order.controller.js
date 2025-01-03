import mongoose from "mongoose";
import Order from "../model/order.model.js";

export const addOrder = async (req, res) => {
    const { user_id, cart_id, cart_items, address_info, order_status, order_date, delivery_date, total_amount } = req.body;

    if (!user_id || !cart_id || !cart_items || !address_info || !order_status || !order_date || !delivery_date || !total_amount) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newOrder = new Order({
            user_id,
            cart_id,
            cart_items,
            address_info,
            order_status,
            order_date,
            delivery_date,
            total_amount
        });
        const order = await newOrder.save();
        res.status(200).json({ message: "Order added successfully", order: order });
    } catch (error) {
        res.status(500).json({ error: "Error Creating Order" })
    }
}

export const getAllOrdersByUserId = async (req, res) => {
    const user_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        const orders = await Order.find({ user_id });
        if (!orders) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json({ message: "Retreive orders successfully", orders: orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message })
    }
}

export const getOrderByOrderId = async (req, res) => {
    const order_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(order_id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        const orders = await Order.findByIdAndDelete(order_id);
        res.status(200).json({ message: "Retreive orders successfully", orders: orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message })
    }
}

export const cancelOrder = async (req, res) => {
    const order_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(order_id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        const order = await Order.findByIdAndDelete(order_id);
        res.status(200).json({ message: "Order Deleted Successfully", order: order });
    } catch (error) {
        res.status(500).json({ message: "Error canceling order", error: error.message })
    }
}