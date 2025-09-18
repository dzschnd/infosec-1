import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ error: "Password is incorrect" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "5min",
  });

  res.json({
    token,
  });
};
