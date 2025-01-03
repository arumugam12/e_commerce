import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unisex'],
        required: true
    },
    primaryColor: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category',
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    seller_name: {
        type: String,
        required: true
    },
    isWearAndReturnEnabled: {
        type: Boolean,
        default: false
    },
    brandInfo: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
