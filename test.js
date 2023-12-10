import React, { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [color, setColor] = useState("#00ff00");
  const [noteText, setNoteText] = useState("");
  const [editColor, setEditColor] = useState("#00ff00");
  const [editNoteText, setEditNoteText] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const addNote = () => {
    if (noteText.trim() === "") {
      alert("Please enter a note.");
      return;
    }

    const newNote = {
      id: Date.now(),
      color,
      text: noteText,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setNoteText("");
  };

  const editNote = (note) => {
    setEditingNote(note);
    setEditNoteText(note.text);
    setEditColor(note.color);
  };

  const saveEdit = () => {
    if (editingNote) {
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id
          ? { ...note, color: editColor, text: editNoteText }
          : note
      );

      setNotes(updatedNotes);
      setEditingNote(null);
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <h1>Note-taking App</h1>
      <div className="note-form">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <textarea
          value={noteText}
          placeholder="Enter your note..."
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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditingNote(null)}>
              &times;
            </span>
            <h2>Edit Note</h2>
            <input
              type="color"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
            />
            <textarea
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
