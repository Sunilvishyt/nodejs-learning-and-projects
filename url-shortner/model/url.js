import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
  urlid: { type: String, required: true },
  redirect: { type: String, required: true },
});

export const urlModel = mongoose.model("url", urlSchema);
