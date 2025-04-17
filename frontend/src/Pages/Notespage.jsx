import React from "react";
import AddNote from "../components/AddNote";
import NotesList from "../components/NotesList";

const NotesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📝 My Notes</h2>
      <AddNote />
      <NotesList />
    </div>
  );
};

export default NotesPage;
