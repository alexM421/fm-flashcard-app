// Load environment variables FIRST, before any other imports
import "./config/env.js";

import express, { Request, Response } from "express";
import cors from "cors";
import flashcardsRouter from "./routes/flashcardsRouter.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(flashcardsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
