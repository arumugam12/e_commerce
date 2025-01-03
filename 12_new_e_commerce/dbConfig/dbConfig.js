import mongoose from 'mongoose';

export const connectToDataBase = () => {
    mongoose.connect("mongodb://localhost:27017/e_commerce", {

    });

    mongoose.connection.on("connected", () => {
        console.log("MongoDB Connected Successfully")
    })

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB Connection Error:", err);
    });

}

export default connectToDataBase;