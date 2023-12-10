function EditModal(props) {
  return (
    <div id="editModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => props.setEditingNote(null)}>
          &times;
        </span>
        <h2>Edit Note</h2>
        <input
          type="color"
          id="edit-color-picker"
          list="presetColors"
          value={props.editColor}
          onChange={(e) => props.setEditColor(e.target.value)}
        />
        <textarea
          id="edit-note-text"
          value={props.editNoteText}
          onChange={(e) => props.setEditNoteText(e.target.value)}
        ></textarea>
        <button onClick={props.saveEdit}>Save</button>
      </div>
    </div>
  );
}

export default EditModal;
