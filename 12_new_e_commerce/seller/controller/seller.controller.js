import Seller from '../model/seller.model.js';
import mongoose from 'mongoose';
import { encrypt, decrypt } from '../../utils/signin_utils.js';
import { generateToken } from '../../middleware/jwtAuth.js';

export const signIn = async (req, res) => {
    const { email, password, mobile_number } = req.body;

    if (!email || !password || !mobile_number) {
        return res.status(400).json({ error: "please fill all details" })
    }

    if (email.length < 1 || email !== email.toLowerCase() || !email.includes("@") || !email.includes(".com") || email.slice(email.length - 5) === ".com") {
        window.alert("Enter a Valid Email");
        return;
    }

    let specialCharacter = "!@#$%^&*()-_=+\|[]{};:/?.>";

    let findSpecial = (() => {
        for (let i = 0; i < specialCharacter.length; i++) {
            if (password.includes((specialCharacter[i]))) {
                return true
            }
        }
    });

    if (password.length < 8 || password == password.toUpperCase() || password == password.toLowerCase() || !findSpecial()) {
        window.alert("Enter a Valid Password");
        return;
    }

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
        return res.status(400).json({ error: 'Email is already registered' });
    }
    const existingMobile = await Seller.findOne({ mobile_number });
    if (existingMobile) {
        return res.status(400).json({ error: 'Mobile number is already registered' });
    }

    const hashedPassword = await encrypt(password);
    const seller = new Seller({
        email,
        mobile_number,
        password: hashedPassword
    });

    try {
        const savedSeller = await seller.save();
        res.status(201).json({ message: "seller Created Successfully", seller: savedSeller });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error Creating seller" })
    }
};

export const logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const seller = await Seller.findOne({ email });
    if (!seller) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await decrypt(password, seller.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(seller.email);
    res.status(200).json({ message: 'Login successful', token });
}

export const registerSeller = async (req, res) => {
    const sellerEmail = req.seller.email;

    if (!sellerEmail) {
        return res.status(404).json({ error: "Seller Not Found" });
    }

    const {
        shop_name,
        business_categories,
        shop_description,
        shop_address,
        shop_city,
        shop_state,
        shop_pincode,
    } = req.body;

    if (!shop_name || !business_categories || !shop_description || !shop_address || !shop_city || !shop_state || !shop_pincode) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const shopDetails = {
        shop_name,
        business_categories,
        shop_description,
        shop_address,
        shop_city,
        shop_state,
        shop_pincode,
    };

    try {
        const updatedSeller = await Seller.findOneAndUpdate(
            { email: sellerEmail },
            shopDetails,
            { new: true }
        );

        if (!updatedSeller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        res.status(200).json({ message: 'Seller registered successfully', seller: updatedSeller });
    } catch (error) {
        console.error('Error registering seller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateSeller = async (req, res) => {
    const sellerEmail = req.seller.email;

    if (!sellerEmail) {
        return res.status(404).json({ error: 'Seller not found' });
    }

    const sellerDetails = req.body;

    try {
        const updatedSeller = await Seller.findOneAndUpdate(
            { email: sellerEmail },
            sellerDetails,
            { new: true }
        )
        if (!updatedSeller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        res.status(200).json({ message: "Seller Updated Successfully", seller: updatedSeller });
    } catch (error) {
        res.status(500).json({ error, message: 'Error updating Seller' });
    }
}

export const deleteSeller = async (req, res) => {
    const sellerEmail = req.seller.email;

    if (!sellerEmail) {
        return res.status(400).json({ error: "Seller Email Not Found" });
    }
    try {
        const seller = await Seller.findOneAndDelete({ email: sellerEmail });
        res.status(200).json({ message: "Seller Deleted Successfully", seller: seller });
    } catch (error) {
        res.status(500).json({ error, message: 'Error deleting Seller' });
    }
}

export const getSeller = async (req, res) => {
    const sellerEmail = req.seller.email;

    if (!sellerEmail) {
        return res.status(400).json({ error: "Seller Email Not Found" });
    }

    try {
        const seller = await Seller.findOne({ email: sellerEmail });
        res.status(200).json({ message: "Seller Found Successfully", seller: seller });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error, message: 'Error getting Seller' });
    }
}

export const getAllSeller = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json({ message: "Sellers Found Successfully", sellers: sellers });
    } catch (error) {
        res.status(500).json({ error, message: 'Error getting all Sellers' });
    }
}