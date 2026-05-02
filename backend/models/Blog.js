import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;