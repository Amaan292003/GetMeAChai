import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/chai`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

export default connectDb;
