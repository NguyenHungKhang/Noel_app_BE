import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });

    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
