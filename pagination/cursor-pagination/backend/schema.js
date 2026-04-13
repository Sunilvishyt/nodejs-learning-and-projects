import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
  createdAt: { type: Date, default: Date.now },
});

export const productsModel = mongoose.model("products", productsSchema);
