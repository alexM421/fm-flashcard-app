import styles from "./StudyStatistics.module.css";
import StudyStatCard from "./StudyStatCard";
import { useDataContext } from "../../../contexts/DataContext";
import type { Flashcard } from "../../../types/types";

export default function StudyStatistics() {
    const { flashcards } = useDataContext();

    // Calculate statistics
    const total = flashcards.length;
    const mastered = flashcards.filter(
        (card: Flashcard) => card.knownCount >= 5,
    ).length;
    const inProgress = flashcards.filter(
        (card: Flashcard) => card.knownCount >= 1 && card.knownCount < 5,
    ).length;
    const notStarted = flashcards.filter(
        (card: Flashcard) => card.knownCount === 0,
    ).length;

    return (
        <div className={styles["study-statistics"]}>
            <h1 className="text-preset-2">Study Statistics</h1>
            <div className={styles["study-statistics-content"]}>
                <StudyStatCard
                    title="Total cards"
                    count={total}
                    imgSrc="/assets/images/icon-stats-total.svg"
                    variant="total"
                />
                <StudyStatCard
                    title="Mastered"
                    count={mastered}
                    imgSrc="/assets/images/icon-stats-mastered.svg"
                    variant="mastered"
                />
                <StudyStatCard
                    title="In Progress"
                    count={inProgress}
                    imgSrc="/assets/images/icon-stats-in-progress.svg"
                    variant="in-progress"
                />
                <StudyStatCard
                    title="Not Started"
                    count={notStarted}
                    imgSrc="/assets/images/icon-stats-not-started.svg"
                    variant="not-started"
                />
            </div>
        </div>
    );
}
