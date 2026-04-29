import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [toast, setToast] = useState(null);

  const [editingBlog, setEditingBlog] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // ✅ Read More state
  const [expandedBlog, setExpandedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(" https://blog-backend-p4he.onrender.com/api/blog");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(` https://blog-backend-p4he.onrender.com/api/blog/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      setToast({ message: "Blog deleted!", type: "success" });
      fetchBlogs();
    } catch {
      setToast({ message: "Delete failed", type: "error" });
    }
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog._id);
    setNewTitle(blog.title);
    setNewContent(blog.content);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        ` https://blog-backend-p4he.onrender.com/api/blog/${editingBlog}`,
        { title: newTitle, content: newContent },
        { headers: { Authorization: "Bearer " + token } }
      );

      setToast({ message: "Blog updated!", type: "success" });
      setEditingBlog(null);
      fetchBlogs();
    } catch {
      setToast({ message: "Update failed", type: "error" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">All Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-5 rounded-2xl shadow-md"
            >
              {editingBlog === blog._id ? (
                <>
                  {/* EDIT MODE */}
                  <input
                    className="w-full mb-2 p-2 border rounded"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />

                  <textarea
                    className="w-full mb-2 p-2 border rounded"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />

                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingBlog(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {/* NORMAL VIEW */}
                  <h3 className="text-xl font-semibold mb-2 break-words">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-2 break-words whitespace-pre-wrap">
                    {expandedBlog === blog._id
                      ? blog.content
                      : blog.content.slice(0, 120) +
                        (blog.content.length > 120 ? "..." : "")}
                  </p>

                  {blog.content.length > 120 && (
                    <button
                      onClick={() =>
                        setExpandedBlog(
                          expandedBlog === blog._id ? null : blog._id
                        )
                      }
                      className="text-blue-500 text-sm mb-3 hover:underline"
                    >
                      {expandedBlog === blog._id
                        ? "Show less"
                        : "Read more"}
                    </button>
                  )}

                  <p className="text-sm text-gray-400 mb-3">
                    By {blog.author}
                  </p>

                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEditClick(blog)}
                      className="bg-yellow-400 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

