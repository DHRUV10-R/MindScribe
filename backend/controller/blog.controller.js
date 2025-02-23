import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Create Blog
export const createBlog = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received files:", req.files);

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({ message: "Title, category & about are required fields" });
    }

    if (!req.files || !req.files.blogImage) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({ message: "Invalid image format. Only jpg, png, and webp are allowed" });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    const blog = await Blog.create(blogData);
    res.status(201).json({ message: "Blog created successfully", blog });

  } catch (error) {
    console.error("Error in createBlog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};

// ✅ Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// ✅ Get Single Blog (with Comments & Likes)
export const getSingleBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blog.findById(id).populate("comments.user", "name");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

// ✅ Get User's Blogs
export const getMyBlogs = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const myBlogs = await Blog.find({ createdBy });
    res.status(200).json(myBlogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user blogs", error });
  }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

// ✅ Like / Unlike a Blog
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user._id.toString();
    const likedIndex = blog.likes.indexOf(userId);

    if (likedIndex === -1) {
      blog.likes.push(userId); // Like the post
    } else {
      blog.likes.splice(likedIndex, 1); // Unlike the post
    }

    await blog.save();
    res.json({ success: true, message: "Like updated", likesCount: blog.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Error liking blog", error });
  }
};

// ✅ Add a Comment
export const commentOnBlog = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text.trim()) return res.status(400).json({ message: "Comment cannot be empty" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = { user: req.user._id, text };
    blog.comments.push(comment);
    await blog.save();

    // Return the updated comment list
    const updatedBlog = await Blog.findById(req.params.id).populate("comments.user", "name");
    res.json({ success: true, comments: updatedBlog.comments });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// ✅ Get All Comments for a Blog
export const getComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("comments.user", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ success: true, comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};
