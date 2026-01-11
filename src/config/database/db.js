import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);

    if (res) {
      console.log("mongoose connected successfully");
    }
  } catch (error) {
    console.error("error while connecting database -->", error);
    process.exit(1); // optional but recommended in prod
  }
};

export default connectDB;
