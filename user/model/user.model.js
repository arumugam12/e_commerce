import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});

const User = mongoose.model('User', userSchema);
export default User;