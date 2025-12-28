import { useEffect, useState } from "react"
import type { Flashcard } from "./DataContext"
import { DataContext } from "./DataContext"
import Data from "../data.json"

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    useEffect(() => {
        const setData = async () => setFlashcards(Data.flashcards)
        setData()
    },[])

    const value = {
        flashcards: flashcards,
        setFlashcards: setFlashcards
    }

    return(
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}