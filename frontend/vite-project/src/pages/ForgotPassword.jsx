import React, { useState } from "react";
import axios from "axios";

function ForgotPassword({ setView }) {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://blog-backend-p4he.onrender.com/api/auth/reset-password",
        formData
      );
      alert("Password updated successfully ✅");
      setView("login");
    } catch (error) {
      console.error(error);
      alert("Error updating password ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Reset Password</h2>

      <input
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
        required
      />

      <input
        name="newPassword"
        type="password"
        placeholder="New Password"
        onChange={handleChange}
        required
      />

      <button type="submit">Update Password</button>

      <p className="link" onClick={() => setView("login")}>
        Back to Login
      </p>
    </form>
  );
}

export default ForgotPassword;