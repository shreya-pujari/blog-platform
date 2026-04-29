import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        " https://blog-backend-p4he.onrender.com/api/blog/create",
        { title, content, author },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setToast({ message: "Blog created successfully!", type: "success" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setToast({ message: "Error creating blog", type: "error" });
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <Navbar />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex items-center justify-center mt-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Blog
          </h2>

          <input
            placeholder="Title"
            className="w-full p-2 mb-4 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Content"
            className="w-full p-2 mb-4 border rounded-lg"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            placeholder="Author"
            className="w-full p-2 mb-4 border rounded-lg"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Create Blog
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
