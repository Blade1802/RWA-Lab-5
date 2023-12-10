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

    setNotes([...notes, newNote]);
    setNoteText("");
  };

  const editNote = (note) => {
    setEditingNote(note);
    setEditNoteText(note.text);
    setEditColor(note.color);
  };

  const saveEdit = () => {
    if (!editingNote) return;

    if (editNoteText.trim() === "") {
      alert("Please enter a note.");
      return;
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editingNote.id
          ? { ...note, color: editColor, text: editNoteText }
          : note
      )
    );

    setEditingNote(null);
  };

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
