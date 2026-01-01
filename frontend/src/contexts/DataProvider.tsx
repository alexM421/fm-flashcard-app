import { useEffect, useState } from "react"
import type { Flashcard } from "../types/types"
import { DataContext } from "./DataContext"
import Data from "../data.json"

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [shuffledFlashcardsIds, setShuffledFlashcardsIds] = useState<string[]>([])

    useEffect(() => {
        const setData = async () => {
            const flashcardsData: Flashcard[] = await new Promise(resolve => setTimeout(() => resolve(Data.flashcards), 1000))
            setFlashcards(flashcardsData)
            setShuffledFlashcardsIds(flashcardsData.map(flashcard => flashcard.id))
        }
        setData()
    },[])

    const value = {
        flashcards: flashcards,
        shuffledFlashcardsIds: shuffledFlashcardsIds,
        setFlashcards: setFlashcards,
        setShuffledFlashcardsIds: setShuffledFlashcardsIds
    }

    return(
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}