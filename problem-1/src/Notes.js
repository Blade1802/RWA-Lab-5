import "./Notes.css";

function Notes(props) {
  return (
    <div className="notes">
      {props.filteredNotes.map((note) => (
        <div
          key={note.id}
          className="note"
          style={{ backgroundColor: note.color }}
        >
          <p>{note.text}</p>
          <p style={{ fontStyle: "italic", fontSize: "0.8em" }}>{note.quote}</p>
          <button
            className="delete-button"
            onClick={() => props.deleteNote(note.id)}
          >
            Delete
          </button>
          <button className="edit-button" onClick={() => props.editNote(note)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notes;
