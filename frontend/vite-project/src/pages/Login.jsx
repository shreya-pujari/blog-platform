import React, { useState } from "react";
import axios from "axios";

function Login({ setView }) {
  const [formData, setFormData] = useState({
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
        "https://blog-backend-p4he.onrender.com/api/auth/login",
        formData
      );
      alert("Login successful ✅");
    } catch (error) {
      alert("Login failed ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

      <button type="submit">Login</button>

      <p className="link" onClick={() => setView("forgot")}>
        Forgot Password?
      </p>

      <p className="link" onClick={() => setView("signup")}>
        Don't have an account? Signup
      </p>
    </form>
  );
}

export default Login;
