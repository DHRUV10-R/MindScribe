import express from "express";
import note from "../models/note.js"; // Ensure the model name matches the exported name
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

/**
 * @route   POST /api/notes/add
 * @desc    Add a new note for the logged-in user
 * @access  Private
 */
router.post("/add", isAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" });
    }

    const newNote = new note({
      title,
      content,
      userId: req.user._id, // comes from isAuthenticated middleware
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ error: "Failed to save note" });
  }
});

/**
 * @route   GET /api/notes
 * @desc    Get all notes for the logged-in user
 * @access  Private
 */
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const notes = await notes.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

export default router;