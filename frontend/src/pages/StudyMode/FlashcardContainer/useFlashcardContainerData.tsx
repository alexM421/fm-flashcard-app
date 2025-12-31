import { useState } from "react"
import { useDataContext } from "../../../contexts/DataContext"
import type { Flashcard as FlashcardType } from "../../../contexts/DataContext"

export default function useFlashcardContainerData() {
    
    const { flashcards, shuffledFlashcardsIds, setShuffledFlashcardsIds, setFlashcards } = useDataContext()
    const [count, setCount] = useState(0)
    
    const currentFlashcard = flashcards.find(flashcard => flashcard.id === shuffledFlashcardsIds[count]) 
    const flashcardsNumber =  shuffledFlashcardsIds.length
    const isCurrentFlashcardMastered = (currentFlashcard?.knownCount || 0) >= 5 
    const currentFlashcardId = currentFlashcard?.id
    
    const increaseKnownCount = () => setFlashcards((prevFlashcards: FlashcardType[]) => {
        return prevFlashcards.map((flashcard) => flashcard.id === currentFlashcardId ? { ...flashcard, knownCount: flashcard.knownCount + 1 } : flashcard)
    })
    
    const resetProgress = () => setFlashcards((prevFlashcards: FlashcardType[]) => {
        return prevFlashcards.map((flashcard) => flashcard.id === currentFlashcardId ? { ...flashcard, knownCount: 0 } : flashcard)
    })

    const incrementCount = () => setCount(prevCount => prevCount + 1)
    const decrementCount = () => setCount(prevCount => prevCount - 1)

    return {
        flashcardsNumber,
        count,
        currentFlashcard,
        flashcards,
        isCurrentFlashcardMastered,
        incrementCount,
        decrementCount,
        increaseKnownCount,
        resetProgress,
        setShuffledFlashcardsIds
    }
}