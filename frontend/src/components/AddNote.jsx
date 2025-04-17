// import React, { useState } from 'react';
// import axios from 'axios';

// const AddNote = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSave = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.post('http://localhost:4001/api/notes/add',
//         { title, content },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setTitle('');
//       setContent('');
//       alert('Note saved!');
//     } catch (error) {
//       console.error('Error saving note:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Note</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       /><br />
//       <textarea
//         rows="6"
//         placeholder="Content"
//         value={content}
//         onChange={e => setContent(e.target.value)}
//       /><br />
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// export default AddNote;
import React, { useState, useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch all notes from the API
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/notes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  // Add a new note
  const handleAddNote = async () => {
    if (!title || !content) {
      return alert("Please provide both title and content.");
    }

    try {
      await axios.post(
        "http://localhost:4001/api/notes/add",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setContent("");
      fetchNotes(); // Refresh notes after adding
      alert("Note saved!");
    } catch (err) {
      console.error("Failed to add note", err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        rows="6"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={handleAddNote}>Save</button>

      <h2>All Notes</h2>
      <ul>
        {notes.length === 0 ? (
          <li>No notes available</li>
        ) : (
          notes.map((note) => (
            <li key={note._id}>
              <strong>{note.title}</strong>: {note.content}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notes;
