import { useContext } from "react";
import { createContext } from "react";
import type { Flashcard } from "../types/types";

type DataContextType = {
    flashcards: Flashcard[];
    shuffledFlashcardsIds: string[];
    setShuffledFlashcardsIds: React.Dispatch<React.SetStateAction<string[]>>;
    fetchFlashcards: () => Promise<void>;
    updateFlashcard: (
        flashcard: Flashcard,
        flashcardId: string,
    ) => Promise<void>;
    deleteFlashcard: (flashcardId: string) => Promise<void>;
    createFlashcard: (flashcard: Flashcard) => Promise<void>;
    updateKnownCount: (
        flashcardId: string,
        knownCount: number,
    ) => Promise<void>;
};

export const DataContext = createContext<DataContextType | undefined>(
    undefined,
);

export const useDataContext = () => {
    const context = useContext(DataContext);

    if (context === undefined) {
        throw new Error("Outside of DataContext provider");
    }

    return context;
};
