import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { login } from "./endpoints/login.js";
import { register } from "./endpoints/register.js";
import { getPosts } from "./endpoints/getPosts.js";
import { auth } from "./middleware.js";

dotenv.config();

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/api/data", auth, getPosts);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
