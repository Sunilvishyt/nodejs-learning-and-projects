import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
  urlid: { type: String, required: true, unique: true },
  redirect: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  lastClickedAt: { type: Date, default: null },
  clickHistory: [{ timestamp: Date, ipAddress: String }],
  expiresAt: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

export const urlModel = mongoose.model("url", urlSchema);
