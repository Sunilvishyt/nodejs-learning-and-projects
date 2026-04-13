import mongoose from "mongoose";
import "dotenv/config";

export default function connectDB() {
  mongoose
    .connect(process.env.MONGODB_KEY)
    .then(() => {
      console.log("database connected");
    })
    .catch(() => {
      console.log("error with database");
    });
}
