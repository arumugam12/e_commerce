import User from '../model/user.model.js'
import { encrypt } from '../../utils/signin_utils.js';
import { decrypt } from '../../utils/signin_utils.js';
import { generateToken } from "../../middleware/jwtAuth.js";
import mongoose from 'mongoose';

export const signIn = async (req, res) => {
    const { email, name, password, mobile_number } = req.body;

    if (!name || !email || !password || !mobile_number) {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
    }
    const existingMobile = await User.findOne({ mobile_number });
    if (existingMobile) {
        return res.status(400).json({ error: 'Mobile number is already registered' });
    }

    try {
        const hashedPassword = await encrypt(password);
        const user = new User({
            email,
            name,
            mobile_number,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.status(201).json({ message: "User Created Successfully", user: savedUser });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error Creating User" })
    }
};

export const logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await decrypt(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(user.email);
    res.status(200).json({ message: 'Login successful', token });
}

export const updateUser = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
    }

    const userDetails = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            userDetails,
            { new: true, upsert: true }
        )
        res.status(200).json({ message: "User Updated Successfully", user: user });
    } catch (error) {
        res.status(500).json({ error, message: 'Error updating user' });
    }
}

export const deleteUser = async (req, res) => {
    const userEmail = req.seller.email

    if (!userEmail) {
        return res.status(400).json({ error: "Invalid User Email" });
    }
    try {
        const user = await User.findOneAndDelete({ email: userEmail });
        res.status(200).json({ message: "User Deleted Successfully", user: user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error, message: 'Error deleting user' });
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
    }

    try {
        const user = await User.findById(id);
        res.status(200).json({ message: "User Found Successfully", user: user });
    } catch (error) {
        res.status(500).json({ error, message: 'Error getting user' });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "User Found Successfully", users: users });
    } catch (error) {
        res.status(500).json({ error, message: 'Error getting all users' });
    }
}