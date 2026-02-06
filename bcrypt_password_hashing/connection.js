import mongoose from "mongoose";
import dotenv from "dotenv/config";

const connectDB = async () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("database connected.");
    })
    .catch(() => {
      console.log("something went wrong.");
    });
};

export default connectDB;
