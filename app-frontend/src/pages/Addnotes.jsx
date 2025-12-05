import React, { useEffect, useState } from "react";

const AddNote = ({editNote,onSuccess}) => {
  const [formData, setFormData] = useState({
    title: "",
    sub: "",
    content: "",
  });

  // Edite mode fill form
  useEffect(()=>{
    if (editNote) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title:editNote.title,
        sub:editNote.sub,
        content:editNote.content
      });
    }
  },[editNote])


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = editNote 
      ?`http://localhost:6060/notes/add/${editNote._id}`
      :"http://localhost:6060/notes/add";

      const method = editNote ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const NoteData = await response.json();

      if (NoteData.success) {
        alert(editNote ? "Note Updated Successfully!":"Note Saved Successfully");

        setFormData({ title: "", sub: "", content: "" });
        if(onSuccess) onSuccess();

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
         <h2>{editNote ? "Update Note" : "Add Note"}</h2>

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
          {editNote ? "Update Note" : "Save Note"}
        </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
