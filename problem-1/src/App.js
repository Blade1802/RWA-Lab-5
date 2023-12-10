import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [color, setColor] = useState("#00ff00");
  const [noteText, setNoteText] = useState("");
  const [editColor, setEditColor] = useState("#00ff00");
  const [editNoteText, setEditNoteText] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [quote, setQuote] = useState("");

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
      quote: quote, // Include the quote in the note
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
      <div className="notes">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note"
            style={{ backgroundColor: note.color }}
          >
            <p>{note.text}</p>
            <p style={{ fontStyle: "italic", fontSize: "0.8em" }}>
              {note.quote}
            </p>
            <button
              className="delete-button"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
            <button className="edit-button" onClick={() => editNote(note)}>
              Edit
            </button>
          </div>
        ))}
      </div>

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
