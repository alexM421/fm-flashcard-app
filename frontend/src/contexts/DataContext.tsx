import { useContext } from "react"
import { createContext } from "react";

export type Flashcard = {
    id: string;
    question: string;
    answer: string;
    category: string;
    knownCount: number;
}

type DataContextType = {
    flashcards: Flashcard[];
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined)


export const useDataContext = () => {
    const context = useContext(DataContext)

    if(context === undefined){
        throw new Error("Outside of DataContext provider")
    }

    return context
}