import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE */
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      user: req.user.id,
    });

    await blog.save();

    res.json({ message: "Created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET */
router.get("/all", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

/* DELETE */
router.delete("/:id", authMiddleware, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* UPDATE */
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  await Blog.findByIdAndUpdate(req.params.id, {
    title,
    content,
  });

  res.json({ message: "Updated" });
});

export default router;
