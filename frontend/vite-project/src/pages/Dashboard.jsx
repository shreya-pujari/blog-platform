import React from "react";

function Dashboard({ setView }) {
  return (
    <div className="form">
      <h2>Dashboard</h2>

      <button onClick={() => setView("create")}>
        Create Blog
      </button>

      <button onClick={() => setView("blogs")}>
        View Blogs
      </button>

      <button onClick={() => setView("login")}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
