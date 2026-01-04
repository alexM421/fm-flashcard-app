import { useMemo, useState } from "react";
import { useDataContext } from "../contexts/DataContext";

export default function useFlashcardLogicData() {
  const {
    flashcards,
    shuffledFlashcardsIds,
    setShuffledFlashcardsIds,
    updateKnownCount,
  } = useDataContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hideMastered, setHideMastered] = useState(false);

  const currentFlashcard = useMemo(
    () =>
      flashcards.find(
        (flashcard) => flashcard.id === shuffledFlashcardsIds[currentIndex],
      ),
    [flashcards, shuffledFlashcardsIds, currentIndex],
  );

  const totalFlashcards = shuffledFlashcardsIds.length;
  const isCurrentFlashcardMastered = (currentFlashcard?.knownCount || 0) >= 5;

  const increaseKnownCount = async () => {
    if(!currentFlashcard?.id) return;
    const currentKnownCount = currentFlashcard.knownCount || 0;
    const newKnownCount = currentKnownCount<5 ? currentKnownCount + 1 : 5;
    try{
      await updateKnownCount(currentFlashcard.id, newKnownCount);
    }catch(error){
      console.error('Failed to update known count:', error);
    }
};

  const resetProgress = async () => {
    if(!currentFlashcard?.id) return;
    try{
      await updateKnownCount(currentFlashcard.id, 0);
    }catch(error){
      console.error('Failed to update known count:', error);
    }
  };

  const incrementCount = () =>
    setCurrentIndex((prev) =>
      Math.min(prev + 1, shuffledFlashcardsIds.length - 1),
    );
  const decrementCount = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const shuffleFlashcards = (flashcardsIds: string[]) => {
    setShuffledFlashcardsIds(flashcardsIds);
    setCurrentIndex(0);
  };

  return {
    totalFlashcards,
    currentIndex,
    currentFlashcard,
    hideMastered,
    flashcards,
    isCurrentFlashcardMastered,
    shuffledFlashcardsIds,
    setHideMastered,
    incrementCount,
    decrementCount,
    increaseKnownCount,
    resetProgress,
    shuffleFlashcards,
  };
};