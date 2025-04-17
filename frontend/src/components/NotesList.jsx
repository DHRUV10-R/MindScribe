import React, { useState, useEffect } from "react";
import axios from "axios";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("/api/notes");
      console.log("Fetched notes:", res.data);

      if (Array.isArray(res.data)) {
        setNotes(res.data);
      } else if (Array.isArray(res.data.notes)) {
        setNotes(res.data.notes);
      } else {
        console.error("Unexpected response format", res.data);
        setNotes([]);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content) return;

    try {
      const res = await axios.post("/api/notes/add", newNote);

      if (res.data && res.data._id) {
        setNotes([res.data, ...notes]);
        setNewNote({ title: "", content: "" });
      } else {
        console.error("Unexpected add note response:", res.data);
      }
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      

        {/* New Note Input Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-10 border-2 border-yellow-400">
          <h3 className="text-2xl font-semibold text-yellow-600 mb-4">✍️ Add a New Note</h3>

          {/* Note Title Input */}
          <input
            className="w-full border-b-2 border-yellow-400 text-xl font-semibold p-3 mb-4 outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />

          {/* Note Content Textarea */}
          <textarea
            className="w-full border border-yellow-300 p-4 rounded-md resize-none h-36 focus:ring-2 focus:ring-yellow-300"
            placeholder="Write your note here..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          ></textarea>

          {/* Add Note Button */}
          <button
            onClick={handleAddNote}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-xl transition-transform transform hover:scale-105"
          >
            ➕ Add Note
          </button>
        </div>

        {/* Notes List */}
        {Array.isArray(notes) && notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-400 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">{note.title}</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No notes found. Start by adding one!</p>
        )}
      </div>
    
  );
};

export default NoteList;
