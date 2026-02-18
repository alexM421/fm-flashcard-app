import { Router } from "express";
import {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  getFlashcardById,
  deleteFlashcard,
  updateKnownCount,
} from "../controller/flashcardsController.js";

const flashcardsRouter = Router();

console.log("Flashcards router configured");
flashcardsRouter.route("/").get(getFlashcards).post(createFlashcard);

flashcardsRouter
  .route("/:id")
  .put(updateFlashcard)
  .get(getFlashcardById)
  .delete(deleteFlashcard);

flashcardsRouter.patch("/:id/known-count", updateKnownCount);

export default flashcardsRouter;
