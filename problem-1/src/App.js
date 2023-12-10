import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Notes from "./Notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [color, setColor] = useState("#00ff00");
  const [noteText, setNoteText] = useState("");
  const [editColor, setEditColor] = useState("#00ff00");
  const [editNoteText, setEditNoteText] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [quote, setQuote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColorFilter, setSelectedColorFilter] = useState("All");

  // External functionality / API
  useEffect(() => {
    // Fetch a random quote when the component mounts
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      console.log(response.data);
      setQuote(response.data.content + "   - " + response.data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // Add button
  const addNote = () => {
    if (noteText.trim() === "") {
      alert("Please enter a note.");
      return;
    }

    const newNote = {
      id: Date.now(),
      color,
      text: noteText,
      quote, // Include the quote in the note
    };

    setNotes([...notes, newNote]);
    setNoteText("");
    fetchRandomQuote(); // Fetch a new quote for the next note
  };

  // Edit Button
  const editNote = (note) => {
    setEditingNote(note);
    setEditNoteText(note.text);
    setEditColor(note.color);
  };

  // Save Button
  const saveEdit = () => {
    if (!editingNote) return;

    if (editNoteText.trim() === "") {
      alert("Please enter a note.");
      return;
    }

    // Set notes to remain the same except the one being edited
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editingNote.id
          ? { ...note, color: editColor, text: editNoteText }
          : note
      )
    );

    setEditingNote(null); // Reset after saving
  };

  // Delete button
  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const filterNotes = () => {
    let filteredNotes = notes;

    if (selectedColorFilter !== "All") {
      filteredNotes = filteredNotes.filter(
        (note) => note.color === selectedColorFilter
      );
    }

    if (searchTerm.trim() !== "") {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filteredNotes = filteredNotes.filter((note) =>
        note.text.toLowerCase().includes(lowercaseSearchTerm)
      );
    }

    return filteredNotes;
  };

  const filteredNotes = filterNotes();

  return (
    <div className="container">
      <h1>Note-taking App</h1>
      <div className="note-form">
        <input
          type="color"
          id="color-picker"
          list="presetColors"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <datalist id="presetColors">
          <option value="#ff0000" />
          <option value="#00ff00" />
          <option value="#0000ff" />
          <option value="#007bff" />
          <option value="#ffff00" />
          <option value="#ffc0cb" />
        </datalist>
        <textarea
          id="note-text"
          placeholder="Enter your note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>
        <button onClick={addNote}>Add</button>
      </div>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search notes..."
          style={{ marginRight: "5px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedColorFilter}
          style={{ marginLeft: "5px" }}
          onChange={(e) => setSelectedColorFilter(e.target.value)}
        >
          <option value="All">All Colors</option>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
          <option value="#007bff">Sky Blue</option>
          <option value="#ffff00">Yellow</option>
          <option value="#ffc0cb">Pink</option>
        </select>
      </div>

      <Notes
        filteredNotes={filteredNotes}
        deleteNote={deleteNote}
        editNote={editNote}
      />

      {editingNote && (
        <div id="editModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditingNote(null)}>
              &times;
            </span>
            <h2>Edit Note</h2>
            <input
              type="color"
              id="edit-color-picker"
              list="presetColors"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
            />
            <textarea
              id="edit-note-text"
              value={editNoteText}
              onChange={(e) => setEditNoteText(e.target.value)}
            ></textarea>
            <button onClick={saveEdit}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
