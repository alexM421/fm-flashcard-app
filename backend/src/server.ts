// Load environment variables FIRST, before any other imports
console.log("PORT AT BOOT:", process.env.PORT);

import "./config/env.js";

console.log("PORT AFTER env.js:", process.env.PORT);

import express, { Request, Response } from "express";
import cors from "cors";
import flashcardsRouter from "./routes/flashcardsRouter.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/flashcards", flashcardsRouter);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
