const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/auth", require("./routes/authRoutes")); // ✅ ADD THIS

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blog-platform")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

