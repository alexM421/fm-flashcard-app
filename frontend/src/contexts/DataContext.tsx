import { useContext } from "react"
import { createContext } from "react";
import type { Flashcard } from "../types/types";

type DataContextType = {
    flashcards: Flashcard[];
    shuffledFlashcardsIds: string[];
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
    setShuffledFlashcardsIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined)


export const useDataContext = () => {
    const context = useContext(DataContext)

    if(context === undefined){
        throw new Error("Outside of DataContext provider")
    }

    return context
}