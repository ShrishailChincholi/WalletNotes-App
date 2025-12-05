import React, { useState } from "react";

const AddNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    sub: "",
    content: "",
  });



  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6060/notes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const NoteData = await response.json();

      if (NoteData.success) {
        alert("Note Saved Successfully!");

        setFormData({
          title: "",
          sub: "",
          content: "",
        });
      }
    } catch (error) {
      console.error("Error : In adding Note", error);
    }
  }

  return (
    <>
      <div className="form-box">
        <h2>Add Note</h2>

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

          <button type="submit">Save Note</button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
