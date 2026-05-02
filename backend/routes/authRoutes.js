import express from "express";
const router = express.Router();

// Example route (keep your existing routes if you have them)
router.post("/register", (req, res) => {
  res.send("Register route working");
});

router.post("/login", (req, res) => {
  res.send("Login route working");
});

export default router;