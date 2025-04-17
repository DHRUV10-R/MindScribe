import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import routes
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import noteRoutes from "./routes/noteRoutes.js"; // 👈 your notes route file

const app = express();
dotenv.config();

// PORT and Mongo URI from .env
const PORT = process.env.PORT || 4001;
const MONOG_URI = process.env.MONOG_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Fallback
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// MongoDB Connection
mongoose
  .connect(MONOG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/notes", noteRoutes); // ✅ Now part of this server

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
