import { useEffect, useState, useCallback } from "react";
import type { Flashcard } from "../types/types";
import { DataContext } from "./DataContext";
import { apiWrapper } from "./apiWrapper";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

	const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [shuffledFlashcardsIds, setShuffledFlashcardsIds] = useState<string[]>([]);
    
    const fetchFlashcards = useCallback(async () => {

		const  { flashcards } = await apiWrapper<{ flashcards :Flashcard[] }>("/flashcards")

        setFlashcards(flashcards);
        setShuffledFlashcardsIds(flashcards.map((flashcard) => flashcard.id));
    
	}, []);

    const createFlashcard = async (newFlashcard: Flashcard) => {
        const previousFlashcards = [...flashcards];
        const previousShuffledFlashcardsIds = [...shuffledFlashcardsIds];

        setFlashcards((prev) => [...prev, newFlashcard]);
        setShuffledFlashcardsIds((prev) => [...prev, newFlashcard.id]);

        try {

			const { flashcard } = await apiWrapper<{ flashcard: Flashcard }>("/flashcards", {
				method: "POST",
				body: newFlashcard
			});

            setFlashcards((prev) =>
                prev.map((f) => (f.id === newFlashcard.id ? flashcard : f)),
            );

            // Update ID in shuffled array if it changed
            if (flashcard.id !== newFlashcard.id) {
                setShuffledFlashcardsIds((prev) => prev.map((id) =>
					id === newFlashcard.id ? flashcard.id : id,
                ));
            }

        } catch (error) {
            console.error("Failed to create flashcard:", error);

            setFlashcards(previousFlashcards);
            setShuffledFlashcardsIds(previousShuffledFlashcardsIds);

            throw error;
        }
    };

    const updateFlashcard = async (
        toUpdateFlashcard: Flashcard,
        flashcardId: string,
    ) => {

        const previousFlashcards = [...flashcards];

        setFlashcards((prev) => prev.map((flashcard) =>
			flashcard.id === flashcardId ? toUpdateFlashcard : flashcard,
        ));

        try {

			const { flashcard: updatedFlashcard} = await apiWrapper<{ flashcard: Flashcard}>(`/flashcards/${flashcardId}`, {
				method: "PUT",
				body: toUpdateFlashcard
			})

            setFlashcards(prev => prev.map(flashcard => flashcard.id === flashcardId ? updatedFlashcard : flashcard));

        } catch (error) {
            console.error("Failed to update flashcard:", error);
            setFlashcards(previousFlashcards);
            throw error;
        }
    };

    const deleteFlashcard = async (flashcardId: string) => {
        const previousFlashcards = [...flashcards];
        const previousShuffledFlashcardsIds = [...shuffledFlashcardsIds];

        setFlashcards((prev) => prev.filter((flashcard) => flashcard.id !== flashcardId));
        setShuffledFlashcardsIds((prev) => prev.filter((id) => id !== flashcardId));

        try {
			
			await apiWrapper<void>(`/flashcards/${flashcardId}`, {
				method: "DELETE"
			})

        } catch (error) {
            console.error("Failed to delete flashcard:", error);
            setFlashcards(previousFlashcards);
            setShuffledFlashcardsIds(previousShuffledFlashcardsIds);
            throw error;
        }
    };

    const updateKnownCount = async (
        flashcardId: string,
        knownCount: number,
    ) => {

        const previousFlashcards = [...flashcards];

        setFlashcards((prev) => prev.map((flashcard) =>
			flashcard.id === flashcardId
				? { ...flashcard, knownCount: knownCount }
				: flashcard,
		));

        try {

			const { flashcard: updatedFlashcard } = await apiWrapper<{ flashcard: Flashcard }>(`/flashcards/${flashcardId}/known-count`, {
				method: "PATCH",
				body: { knownCount: knownCount }
			})

            setFlashcards(prev => prev.map(flashcard => flashcard.id === flashcardId? updatedFlashcard: flashcard))

        } catch (error) {
            console.error("Failed to update known count:", error);
            setFlashcards(previousFlashcards);
            throw error;
        }
    };

    useEffect(() => {
        const initialDataFetch = async () => {
            await fetchFlashcards();
        };
        initialDataFetch();
    }, [fetchFlashcards]);

    const value = {
        flashcards: flashcards,
        shuffledFlashcardsIds: shuffledFlashcardsIds,
        setShuffledFlashcardsIds: setShuffledFlashcardsIds,
        fetchFlashcards: fetchFlashcards,
        updateFlashcard: updateFlashcard,
        deleteFlashcard: deleteFlashcard,
        createFlashcard: createFlashcard,
        updateKnownCount: updateKnownCount,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
