import React, { useState } from "react";
import axios from "axios";

function Signup({ setView }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://blog-backend-p4he.onrender.com/api/auth/register",
        formData
      );
      alert("Signup successful ✅");
      setView("login");
    } catch (error) {
      alert("Signup failed ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Signup</h2>

      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

      <button type="submit">Signup</button>

      <p className="link" onClick={() => setView("login")}>
        Already have an account? Login
      </p>
    </form>
  );
}

export default Signup;
