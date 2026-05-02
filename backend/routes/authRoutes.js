import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: cleanEmail,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* RESET PASSWORD */
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;