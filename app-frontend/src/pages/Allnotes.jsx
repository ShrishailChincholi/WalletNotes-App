import React, { useEffect, useState } from 'react';

const AllNotes = ({ onEdit }) => {
  const [notes, setNotes] = useState([]);

  async function fectNotes() {
    try {
      const res = await fetch("http://localhost:6060/notes/add");
      const data = await res.json();
      setNotes(data)
    } catch (error) {
      console.log("Erron Fetching notes:", error)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fectNotes()
  }, [])

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:6060/notes/add/${id}`, {
        method: "DELETE",

      });
      console.log("Deleted")
      fectNotes(); // Refresh UI
    } catch (error) {
      console.log("Error Deleting:", error);
    }
  }

  return (
    <div className="notes-container">
      <h2 className="notes-heading">📚 All Notes Titles</h2>

      <div className="notes-grid">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3 className="note-title">📌 {note.title}</h3>

              <div className="btn-group">
                <button className="update-btn" onClick={() => onEdit(note)}>
                  ✏️ Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(note._id)}>
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notes">No Notes Found</p>
        )}
      </div>
    </div>
  );
};

export default AllNotes;