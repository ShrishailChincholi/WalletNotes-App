import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  async function fectNotes() {
    try {
      const res = await fetch("http://localhost:6060/notes/add",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      const data = await res.json();
      console.log("NOTES API DATA:", data);

      if (!res.ok) {
        alert(data.message || "Unauthorized");
        console.log("Unauthorized geting allnotes ")
        return;
      };

      // setNotes(data.data || []) // Onlu user notes show
      // setNotes(data?.data ?? []);
      setNotes(Array.isArray(data.data) ? data.data : []);

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
      const res = await fetch(`http://localhost:6060/notes/add/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      console.log("Deleted")
      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Delete Failed;");
        return;
      }

      setNotes((prev) => prev.filter((note) => note._id !== id));
      // fectNotes(); // Refresh UI
    } catch (error) {
      console.log("Error Deleting:", error);
    }
  }

  function handleEdit(id) {
    navigate(`/notes/add?id=${id}`); // Redirect to AddNotes for Edit mode
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
                <button className="update-btn" onClick={() => handleEdit(note._id)}>
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