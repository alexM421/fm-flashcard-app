import type { Flashcard } from "../../../types/types"
import styles from "./AllCardsList.module.css"
import FlashcardCard from "./FlashcardCard"

export default function AllCardsList ({ flashcards, shuffledFlashcardsIds }: { flashcards: Flashcard[], shuffledFlashcardsIds: string[] }) {

    const filteredFlashcards = shuffledFlashcardsIds.map((id) => flashcards.find((flashcard) => flashcard.id === id)).filter((flashcard) => flashcard !== undefined)

    return(
        <div className={styles["all-cards-list"]}>
            {filteredFlashcards.map((flashcard) => (
                <FlashcardCard key={flashcard.id} flashcard={flashcard} />
            ))}
        </div>
    )
}