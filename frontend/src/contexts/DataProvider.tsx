import { useEffect, useState } from "react";
import type { Flashcard } from "../types/types";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [shuffledFlashcardsIds, setShuffledFlashcardsIds] = useState<string[]>(
    [],
  );

  const fetchFlashcards = async () => {
    const flashcardsDataResponse: Response = await fetch("http://localhost:3001/flashcards")
    const flashcardsData: Flashcard[] = await flashcardsDataResponse.json();
    setFlashcards(flashcardsData);
    setShuffledFlashcardsIds(flashcardsData.map((flashcard) => flashcard.id));
  };

  const updateFlashcard = async (flashcard: Flashcard) => {
    const flashcardsDataResponse: Response = await fetch("http://localhost:3001/flashcards", {
      method: "PUT",
      body: JSON.stringify(flashcard),
    });
    console.log(flashcardsDataResponse);
  };

  const deleteFlashcard = async (flashcardId: string) => {
    const flashcardsDataResponse: Response = await fetch("http://localhost:3001/flashcards", {
      method: "DELETE",
      body: JSON.stringify({ id: flashcardId }),
    });
    console.log(flashcardsDataResponse);
  };

  const createFlashcard = async (flashcard: Flashcard) => {
    const flashcardsDataResponse: Response = await fetch("http://localhost:3001/flashcards", {
      method: "POST",
      body: JSON.stringify(flashcard),
    });
    console.log(flashcardsDataResponse);
  };

  useEffect(() => {

    const intialDataFetch = async () => {
      await fetchFlashcards();
    };
    intialDataFetch();
  }, []);

  const value = {
    flashcards: flashcards,
    shuffledFlashcardsIds: shuffledFlashcardsIds,
    setShuffledFlashcardsIds: setShuffledFlashcardsIds,
    fetchFlashcards: fetchFlashcards,
    updateFlashcard: updateFlashcard,
    deleteFlashcard: deleteFlashcard,
    createFlashcard: createFlashcard
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
