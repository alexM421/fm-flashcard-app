import type { Flashcard } from "../../../types/types"
import styles from "./AllCardsList.module.css"
import FlashcardCard from "./FlashcardCard"

export default function AllCardsList ({ flashcards }: { flashcards: Flashcard[] }) {
    return(
        <div className={styles["all-cards-list"]}>
            {flashcards.map((flashcard) => (
                <FlashcardCard key={flashcard.id} flashcard={flashcard} />
            ))}
        </div>
    )
}