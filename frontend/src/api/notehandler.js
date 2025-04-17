import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4001/api/notes", // Backend server URL
  withCredentials: true, // Ensure cookies are sent (if using authentication)
});

// API calls
export const addNote = (noteData) => API.post("/add", noteData);
export const getNotes = () => API.get("/");
