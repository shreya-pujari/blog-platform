const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);

