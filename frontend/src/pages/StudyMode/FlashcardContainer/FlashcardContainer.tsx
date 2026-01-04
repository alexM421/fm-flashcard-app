import Button from "../../../shared/Button/Button";
import styles from "./FlashcardContainer.module.css";
import Flashcard from "./Flashcard";
import useFlashcardLogicData from "../../../hooks/useFlashcardLogicData";
import ShuffleNavBar from "../../../components/ShuffleNavBar/ShuffleNavBar";
import { useNavigate } from "react-router-dom";

export default function FlashcardContainer() {
  const navigate = useNavigate();

  const {
    flashcards,
    totalFlashcards,
    currentIndex,
    currentFlashcard,
    isCurrentFlashcardMastered,
    hideMastered,
    incrementCount,
    decrementCount,
    resetProgress,
    increaseKnownCount,
    shuffleFlashcards,
    setHideMastered,
  } = useFlashcardLogicData();

  /*If there are no cards to study*/
  if (flashcards.length === 0) {
    return (
      <div className={styles["flashcard-container"]}>
        <ShuffleNavBar
          flashcards={flashcards}
          shuffleFlashcards={shuffleFlashcards}
          hideMastered={hideMastered}
          setHideMastered={setHideMastered}
        />
        <div className={styles["flashcard-container-empty"]}>
          <h1 className="text-preset-2">No cards to study</h1>
          <p className="text-preset-4-regular">
            You don’t have any cards yet. Add your first card in the All Cards
            tab.
          </p>
          <Button
            text="Go to All Cards"
            onClick={() => navigate("/all-cards")}
            variants="shadow"
          />
        </div>
      </div>
    );
  }

  /*If all cards are mastered*/
  if (
    flashcards.length ===
      flashcards.filter((flashcard) => flashcard.knownCount >= 5).length &&
    hideMastered
  ) {
    return (
      <div className={styles["flashcard-container"]}>
        <ShuffleNavBar
          flashcards={flashcards}
          shuffleFlashcards={shuffleFlashcards}
          hideMastered={hideMastered}
          setHideMastered={setHideMastered}
        />
        <div className={styles["flashcard-container-empty"]}>
          <h1 className="text-preset-2">You're all caught up!</h1>
          <p className="text-preset-4-regular">
            All your cards are mastered. Turn off “Hide mastered” to see them
            again.
          </p>
        </div>
      </div>
    );
  }

  /*If there are cards to study*/
  return (
    <div className={styles["flashcard-container"]}>
      <ShuffleNavBar
        flashcards={flashcards}
        shuffleFlashcards={shuffleFlashcards}
        hideMastered={hideMastered}
        setHideMastered={setHideMastered}
      />
      <div className={styles["flashcard-container-main"]}>
        <Flashcard flashcard={currentFlashcard} />
        <div>
          <Button
            imgSrcName="icon-circle-check.svg"
            text={
              isCurrentFlashcardMastered ? "Already Mastered" : "I Know This"
            }
            variants="shadow"
            onClick={increaseKnownCount}
            disabled={isCurrentFlashcardMastered}
          />
          <Button
            imgSrcName="icon-reset.svg"
            text="Reset Progress"
            variants="shadow"
            onClick={resetProgress}
          />
        </div>
      </div>
      <div className={styles["flashcard-container-footer"]}>
        <Button
          imgSrcName="icon-chevron-left.svg"
          text="Previous"
          onClick={decrementCount}
          disabled={currentIndex === 0}
        />
        <p className="text-preset-5">{`Card ${currentIndex + 1} of ${totalFlashcards}`}</p>
        <Button
          imgSrcName="icon-chevron-right.svg"
          text="Next"
          variants="reverse"
          onClick={incrementCount}
          disabled={currentIndex === totalFlashcards - 1}
        />
      </div>
    </div>
  );
}
