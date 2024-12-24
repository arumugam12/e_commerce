import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    review: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
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
            rating: {
                type: Number,
                enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                required: true
            }
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Review = mongoose.model("review", reviewSchema);
export default Review;