import styles from "./StudyMode.module.css";
import FlashcardContainer from "./FlashcardContainer/FlashcardContainer";
import StudyStatistics from "./StudyStaticstics/StudyStatistics";

export default function StudyMode() {
    return (
        <div className={styles["study-mode"]}>
            <FlashcardContainer />
            <StudyStatistics />
        </div>
    );
}
