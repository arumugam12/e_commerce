import mongoose from 'mongoose';
import Product from '../model/product.model.js';
import Seller from '../../seller/model/seller.model.js';

export const createProduct = async (req, res) => {
    const { name, description, gender, primaryColor, mrp, price, category, stock, isWearAndReturnEnabled, brandInfo } = req.body;

    const sellerEmail = req.seller.email;

    if (!name || !description || !gender || !primaryColor || !mrp || !price || !category || !stock) {
        return res.status(400).json({ error: "Please fill all required fields" });
    }

    try {
        const seller = await Seller.findOne({ email: sellerEmail });
        if (!seller) {
            return res.status(400).json({ error: "Seller not found" });
        }

        const product = new Product({
            name,
            description,
            gender,
            primaryColor,
            mrp,
            price,
            category,
            stock,
            createdBy: seller._id,
            seller_name: seller.name,
            isWearAndReturnEnabled: isWearAndReturnEnabled || false,
            brandInfo: brandInfo || "",
        });
        const savedProduct = await product.save();
        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        res.status(400).json({ error, message: "Error creating product" });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const product_id = req.params.product_id;

        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({ error: "Invalid product ID format" });
        }

        const update = req.body;

        const updateProduct = await Product.findByIdAndUpdate(
            product_id,
            update,
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "Product updated successfully", product: updateProduct });

        if (!updateProduct) {
            res.status(400).json({ error, message: "Product not found" })
        }

    } catch (error) {
        res.status(500).json({ error, message: "Error updating product" });
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.product_id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
    }

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product Deleting Successfully", product: product })
    } catch (error) {
        res.status(500).json({ error, message: "Error Deleting Product" })
    }
}

export const getProductById = async (req, res) => {

    const product_id = req.params.product_id;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
    }

    try {
        const product = await Product.findById(product_id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Success", product: product });
    } catch (error) {
        res.status(500).json({ error, message: "Error getting Product" })
    }
}

export const getProductsBySellerId = async (req, res) => {
    try {
        const seller = await Seller.findOne({ email: req.seller.email }).select('_id');
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }

        const products = await Product.find({ createdBy: seller._id });
        if (!products) {
            res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Success", product: products });
    } catch (error) {
        res.status(500).json({ error, message: "Error getting Products" })
    }
}

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "Retrieve Products Successfully", products: products })
    } catch (error) {
        res.status(500).json({ message: "Error Retrieving Product", error: error })
    }
}