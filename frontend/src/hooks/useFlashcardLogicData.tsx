import { useMemo, useState } from "react"
import { useDataContext } from "../contexts/DataContext"
import type { Flashcard as FlashcardType } from "../types/types"

export default function useFlashcardLogicData() {
    
    const { flashcards, shuffledFlashcardsIds, setShuffledFlashcardsIds, setFlashcards } = useDataContext()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [hideMastered, setHideMastered] = useState(false)

    const currentFlashcard = useMemo(
        () => flashcards.find(flashcard => flashcard.id === shuffledFlashcardsIds[currentIndex]),
        [flashcards, shuffledFlashcardsIds, currentIndex]
    )

    const totalFlashcards =  shuffledFlashcardsIds.length
    const isCurrentFlashcardMastered = (currentFlashcard?.knownCount || 0) >= 5 
   
    
    const increaseKnownCount = () => setFlashcards((prevFlashcards: FlashcardType[]) => currentFlashcard 
         ? prevFlashcards.map((flashcard) => flashcard.id === currentFlashcard.id ? { ...flashcard, knownCount: flashcard.knownCount + 1 } : flashcard)
         : prevFlashcards
    )
    
    const resetProgress = () => setFlashcards((prevFlashcards: FlashcardType[]) => currentFlashcard 
        ? prevFlashcards.map((flashcard) => flashcard.id === currentFlashcard.id ? { ...flashcard, knownCount: 0 } : flashcard)
        : prevFlashcards
    )

    const incrementCount = () => setCurrentIndex(prev => Math.min(prev + 1, shuffledFlashcardsIds.length - 1))
    const decrementCount = () => setCurrentIndex(prev => Math.max(prev - 1, 0))

    const shuffleFlashcards = (flashcardsIds: string[]) => {
        setShuffledFlashcardsIds(flashcardsIds)
        setCurrentIndex(0)
    }

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
        shuffleFlashcards
    }
}