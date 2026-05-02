import React, { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import ViewBlogs from "./pages/ViewBlogs";
import "./index.css";

function App() {
  const [view, setView] = useState("login");

  return (
    <div className="container">
      <h1 className="title">Blog Platform</h1>

      <div className="card">
        {view === "login" && <Login setView={setView} />}
        {view === "signup" && <Signup setView={setView} />}
        {view === "forgot" && <ForgotPassword setView={setView} />}
        {view === "dashboard" && <Dashboard setView={setView} />}
        {view === "create" && <CreateBlog setView={setView} />}
        {view === "blogs" && <ViewBlogs setView={setView} />}
      </div>
    </div>
  );
}

export default App;
