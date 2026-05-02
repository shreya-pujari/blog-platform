import React, { useState } from "react";
import axios from "axios";

function CreateBlog({ setView }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://blog-backend-p4he.onrender.com/api/blog/create",
        formData
      );

      alert("Blog created ✅");
      setView("dashboard");
    } catch (error) {
      alert("Error creating blog ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Create Blog</h2>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />

      <textarea
        name="content"
        placeholder="Content"
        onChange={handleChange}
        required
        style={{ width: "100%", height: "100px", marginTop: "10px" }}
      />

      <button type="submit">Create</button>

      <button type="button" onClick={() => setView("dashboard")}>
        Back
      </button>
    </form>
  );
}

export default CreateBlog;
