import type { Flashcard } from "../../../types/types";
import styles from "./AllCardsList.module.css";
import FlashcardCard from "./FlashcardCard";
import { useState } from "react";
import Button from "../../../shared/Button/Button";

export default function AllCardsList({
    flashcards,
    shuffledFlashcardsIds,
}: {
    flashcards: Flashcard[];
    shuffledFlashcardsIds: string[];
}) {
    const [showAll, setShowAll] = useState(false);

    const filteredFlashcards = shuffledFlashcardsIds
        .map((id) => flashcards.find((flashcard) => flashcard.id === id))
        .filter((flashcard) => flashcard !== undefined);

    return (
        <div className={styles["all-cards-list"]}>
            <div className={styles["all-cards-list-cards"]}>
                {showAll
                    ? filteredFlashcards.map((flashcard) => (
                          <FlashcardCard
                              key={flashcard.id}
                              flashcard={flashcard}
                          />
                      ))
                    : filteredFlashcards
                          .slice(0, 12)
                          .map((flashcard) => (
                              <FlashcardCard
                                  key={flashcard.id}
                                  flashcard={flashcard}
                              />
                          ))}
            </div>
            {!showAll && filteredFlashcards.length > 12 && (
                <Button
                    text="Load More"
                    onClick={() => setShowAll(true)}
                    variants="shadow"
                />
            )}
        </div>
    );
}
