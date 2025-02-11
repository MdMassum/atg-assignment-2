import mongoose from "mongoose";

const connectDB = async () => {

    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log("Mongodb Connected Successfully!")

    } catch (error) {
      console.log("Error connecting to MongoDB");
    }
};

export default connectDB;
