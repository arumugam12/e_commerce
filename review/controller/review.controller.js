import mongoose from "mongoose";
import Review from "../model/review.model.js";
import Product from "../../product/model/product.model.js";
import User from "../../user/model/user.model.js"

export const addReview = async (req, res) => {
    const { product_id, reviews } = req.body;

    if (!product_id || !Array.isArray(reviews) || reviews.length === 0) {
        return res.status(404).json({ error: "Please fill all field" });
    }

    for (let review of reviews) {
        if (!mongoose.Types.ObjectId.isValid(review.user_id)) {
            return res.status(404).json({ error: "Enter a Valid user_id" })
        }
        if (!review.title || !review.description || !review.rating) {
            return res.status(404).json({ error: "Please fill all field" })
        }
    }

    try {
        const product = await Product.findById(product_id);

        if (!product) {
            return res.status(404).json({ error: "Product Not Found" });
        }

        for (let review of reviews) {
            const user_email = req.seller;
            const user = await User.findOne(user_email);
            if (!user) {
                return res.status(404).json({ error: "User Not Found" });
            }
            let { title, description, rating } = review;

            
        }

        const review = new Review({

        })

    } catch (error) {
        res.status(500).json({ message: "Error Adding Review", error: error });
    }
}