import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

/* CREATE BLOG */
router.post("/create", async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = new Blog({ title, content });
    await blog.save();

    res.json({ message: "Blog created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL BLOGS */
router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;