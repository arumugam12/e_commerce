import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    mobile_number: {
        type: Number,
        unique: true,
        required: false,
    },
    shop_name: {
        type: String,
        required: false,
    },
    business_categories: {
        type: String,
        enum: [
            "Beauty & Personal Care",
            "Sports & Fitness",
            "Electronics & Gadgets",
            "Home & Kitchen",
            "Fashion & Apparel",
            "Books & Stationery",
            "Toys & Games",
        ],
        required: false,
    },
    shop_description: {
        type: String,
        required: false,
    },
    shop_address: {
        type: String,
        required: false,
    },
    shop_city: {
        type: String,
        required: false,
    },
    shop_state: {
        type: String,
        required: false,
    },
    shop_pincode: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;