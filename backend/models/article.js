const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: String,
    author: String,
    url: String,
    points: Number,
    summary: String,
    image: String,
    created_at: Date,
    source: String,
    category: String,
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
