import { db } from "../db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
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

  if (user) {
    return res.status(401).json({ error: "User already exists" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await db.user.create({
      data: { username: username, password: hashedPassword },
    });
    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register" });
  }
};
