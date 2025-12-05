import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    sub: "",
    content: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const noteId = params.get("id");


  async function fetchNote() {
    try {
      const res = await fetch(`http://localhost:6060/notes/add/${noteId}`);
      const data = await res.json();
      setFormData({
        title: data.title,
        sub: data.sub,
        content: data.content,
      });
    } catch (err) {
      console.log("Error loading note:", err);
    }
  }

  useEffect(() => {
    if (noteId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchNote();
    }
  }, [noteId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const method = noteId ? "PUT" : "POST";
    const url = noteId
      ? `http://localhost:6060/notes/add/${noteId}`
      : "http://localhost:6060/notes/add";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert(noteId ? "Note Updated Successfully!" : "Note Saved Successfully");
      if (noteId) {
        // Only when update → redirect
        navigate("/notes/all");
      } else {
        // When adding new → stay here + clear form
        setFormData({ title: "", sub: "", content: "" });
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }

  return (
    <>
      <div className="form-box">
        <h2>{noteId ? "Update Note" : "Add Note"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter Title"
            required
            onChange={handleChange}
          />

          <label>Subject *</label>
          <input
            type="text"
            name="sub"
            value={formData.sub}
            placeholder="Enter Subject"
            required
            onChange={handleChange}
          />

          <label>Content *</label>
          <textarea
            name="content"
            rows="4"
            value={formData.content}
            placeholder="Write your note..."
            required
            onChange={handleChange}
          ></textarea>

          <button type="submit">
            {noteId ? "Update Note" : "Save Note"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
