import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewBlogs({ setView }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "https://blog-backend-p4he.onrender.com/api/blog/all"
      );
      setBlogs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      <h2>All Blogs</h2>

      {blogs.length === 0 ? (
        <p>No blogs yet</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px"
          }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))
      )}

      <button onClick={() => setView("dashboard")}>
        Back
      </button>
    </div>
  );
}

export default ViewBlogs;