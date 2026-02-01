import mongoose from "mongoose";
import dotenv from "dotenv/config";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("database connected"))
    .catch(() => console.log("something we wrong with database"));
};
