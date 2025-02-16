import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  blogImage: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  category: { type: String, required: true },
  about: { type: String, required: true, minlength: [100, "At least 100 characters!"] },
  adminName: { type: String },
  adminPhoto: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }], // 🆕 Like Feature
  comments: [commentSchema], // 🆕 Comment Feature
});

export const Blog = mongoose.model("Blog", blogSchema);
