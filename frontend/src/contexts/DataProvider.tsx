import { useEffect, useState } from "react";
import type { Flashcard } from "../types/types";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [shuffledFlashcardsIds, setShuffledFlashcardsIds] = useState<string[]>([]);

  const fetchFlashcards = async () => {
    const flashcardsDataResponse: Response = await fetch("http://localhost:3001/flashcards")
    const flashcardsData: Flashcard[] = await flashcardsDataResponse.json();
    setFlashcards(flashcardsData);
    setShuffledFlashcardsIds(flashcardsData.map((flashcard) => flashcard.id));
  };

  const createFlashcard = async (flashcard: Flashcard) => {
    const flashcardsDataResponse: Response = await fetch("http://localhost:3001/flashcards", {
      method: "POST",
      body: JSON.stringify(flashcard),
    });
    console.log(flashcardsDataResponse);
  };

  const updateFlashcard = async (flashcard: Flashcard, flashcardId: string) => {
    const flashcardsDataResponse: Response = await fetch(`http://localhost:3001/flashcards/${flashcardId}`, {
      method: "PUT",
      body: JSON.stringify(flashcard),
    });
    console.log(flashcardsDataResponse);
  };

  const deleteFlashcard = async (flashcardId: string) => {
    const flashcardsDataResponse: Response = await fetch(`http://localhost:3001/flashcards/${flashcardId}`, {
      method: "DELETE",
      body: JSON.stringify({ id: flashcardId }),
    });
    console.log(flashcardsDataResponse);
  };

  const updateKnownCount = async (flashcardId: string, knownCount: number) => {

    const previousFlashcards = [...flashcards];

    setFlashcards(previousFlashcards.map((flashcard) => flashcard.id === flashcardId ? { ...flashcard, knownCount: knownCount } : flashcard));

    try{
      const flashcardsDataResponse: Response = await fetch(`http://localhost:3001/flashcards/${flashcardId}/known-count`, {
        method: "PATCH",
        body: JSON.stringify({ knownCount: knownCount }),
      });
     
      if(!flashcardsDataResponse.ok) {
        throw new Error('Failed to update known count');
      };

    }catch(error){
      console.error('Failed to update known count:', error);
      setFlashcards(previousFlashcards);
      throw error;
    }
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
    createFlashcard: createFlashcard,
    updateKnownCount: updateKnownCount
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
