import mongoose from "mongoose";
import dotenv from "dotenv/config";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connected ✅");
    })
    .catch(() => {
      console.log("Something got wrong with database");
    });
};
