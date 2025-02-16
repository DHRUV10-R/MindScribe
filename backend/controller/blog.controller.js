import mongoose, { mongo } from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
/*export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }
    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }
    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category & about are required fields" });
    }
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
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

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
*/
export const createBlog = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received files:", req.files);

    // Ensure all required fields exist
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
      return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
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
    console.log("Error in createBlog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};

export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(updatedBlog);
};

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user._id;
    const likedIndex = blog.likes.indexOf(userId);

    if (likedIndex === -1) {
      blog.likes.push(userId);
    } else {
      blog.likes.splice(likedIndex, 1);
    }

    await blog.save();
    res.json({ success: true, likes: blog.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const commentOnBlog = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text.trim()) return res.status(400).json({ message: "Comment cannot be empty" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = { user: req.user._id, text };
    blog.comments.push(comment);
    await blog.save();

    res.json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🆕 Get Comments for a Blog
export const getComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("comments.user", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};