import mongoose from "mongoose";
import Cart from "../model/cart.model.js";
import User from "../../user/model/user.model.js"
import Product from "../../product/model/product.model.js";

export const addProductToCart = async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(404).json({ error: "Please fill all fields" });
    }

    for (let item of items) {
        if (!item.product_id || !mongoose.Types.ObjectId.isValid(item.product_id)) {
            return res.status(404).json({ error: `Invalid Product ID: ${item.product_id}` });
        }
        if (!item.quantity || item.quantity < 1) {
            return res.status(404).json({ error: "Add A tleast 1 Product" })
        }
    }

    try {
        const user = await User.findOne({ email: req.seller.email });
        const user_id = user._id;

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(404).json({ error: "Invalid User ID Format" });
        }

        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({ user_id, items: [] });
        }

        for (let item of items) {
            let { product_id, quantity } = item;

            const product = await Product.findById(product_id);

            if (!product) {
                return res.status(404).json({ error: "Product Not Found" });
            }

            const findCurrentProductIndex = cart.items.findIndex(
                (item) => item.product_id.toString() === product_id
            );

            if (findCurrentProductIndex === -1) {
                cart.items.push({ product_id, quantity })
            } else {
                cart.items[findCurrentProductIndex].quantity += quantity;
            }

        }
        const savedCart = await cart.save();
        res.status(200).json({ message: "Product Save To Cart Successfully", cart: savedCart })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error, message: "Error Adding Product To Cart" })
    }
}

export const getCartByUserId = async (req, res) => {
    const user_id = req.params.id;

    if (!user_id) {
        return res.status(404).json({ error: "User Not Found" })
    }

    try {
        const cart = await Cart.findOne({ user_id });
        res.status(200).json({ message: "Cart Getting Successfully", cart: cart })
    } catch (error) {
        res.status(500).json({ error: "Error Getting Cart" })
    }
}

export const deleteCartProduct = async (req, res) => {
    const { cart_item_id, user_id } = req.body;

    if (!cart_item_id || !mongoose.Types.ObjectId.isValid(cart_item_id)) {
        res.status(404).json({ message: "Invalid ID Format" })
    }

    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        res.status(404).json({ message: "Invalid ID Format" })
    }

    try {
        const cart = await Cart.findOneAndUpdate(
            { user_id },
            { $pull: { items: { _id: cart_item_id } } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ error: "Cart not found or Item not found" })
        }
        res.status(200).json({ message: "Cart Deleted Successfully", cart: cart })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error, message: "Error Deleting Cart" })
    }
}