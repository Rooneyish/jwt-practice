import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to the database successfully.")
    }
    catch(error){
        console.log(error);
    }
}

export default connectDB;