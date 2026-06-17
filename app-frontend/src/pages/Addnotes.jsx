import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AddNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    sub: "",
    content: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const noteId = params.get("id");

  const token = localStorage.getItem("token");

  async function fetchNote() {
    try {
      const res = await fetch(
        `http://localhost:6060/notes/add/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setFormData({
        title: data.data.title,
        sub: data.data.sub,
        content: data.data.content,
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const method = noteId ? "PUT" : "POST";

    const url = noteId
      ? `http://localhost:6060/notes/add/${noteId}`
      : "http://localhost:6060/notes/add";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);

        setFormData({
          title: "",
          sub: "",
          content: "",
        });

        setTimeout(() => {
          navigate("/dashboard"); // Dashboard route
        }, 2000);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }

  return (
    <div className="form-box">
      <h2>{noteId ? "Update Note" : "Add Note"}</h2>

      {showAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <AlertTitle>Success</AlertTitle>
          {noteId
            ? "Note Updated Successfully!"
            : "Note Saved Successfully!"}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <label>Note Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Enter note title"
          required
          onChange={handleChange}
        />

        <label>Subject *</label>
        <input
          type="text"
          name="sub"
          value={formData.sub}
          placeholder="Enter subject"
          required
          onChange={handleChange}
        />

        <label>Note Content *</label>
        <textarea
          name="content"
          rows="4"
          value={formData.content}
          placeholder="Write your note here..."
          required
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          {noteId ? "Update Note" : "Save Note"}
        </button>
      </form>
    </div>
  );
};

export default AddNote;