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

flashcardsRouter.route("/")
    .get(getFlashcards)
    .post(createFlashcard)

flashcardsRouter.route("/:id")
    .put(updateFlashcard)
    .get(getFlashcardById)
    .delete(deleteFlashcard);

    flashcardsRouter.patch("/:id/known-count", updateKnownCount);

export default flashcardsRouter;
