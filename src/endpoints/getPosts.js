import { db } from "../db.js";
import validator from "validator";

export const getPosts = async (req, res) => {
  try {
    const posts = await db.post.findMany();
    res.json({
      posts: posts,
      requestFrom: validator.escape(req.username),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
