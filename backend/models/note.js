// import { Schema, model } from "mongoose";

// const NoteSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default model("note", NoteSchema);
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;