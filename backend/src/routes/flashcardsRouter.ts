import { Router } from "express";
import {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  getFlashcardById,
  deleteFlashcard,
  updateKnownCount
} from "../controller/flashcardsController";

const flashcardsRouter = Router();

flashcardsRouter.get("/", getFlashcards);
flashcardsRouter.post("/", createFlashcard);
flashcardsRouter.put("/:id", updateFlashcard);
flashcardsRouter.get("/:id", getFlashcardById);
flashcardsRouter.delete("/:id", deleteFlashcard);
flashcardsRouter.patch("/:id/known-count", updateKnownCount);

export default flashcardsRouter;
