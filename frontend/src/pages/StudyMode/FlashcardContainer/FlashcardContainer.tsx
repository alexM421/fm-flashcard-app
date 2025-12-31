import Button from "../../../shared/Button/Button"
import styles from "./FlashcardContainer.module.css"
import Flashcard from "./Flashcard"
import useFlashcardContainerData from "./useFlashcardContainerData"
import ShuffleNavBar from "../../../components/ShuffleNavBar/ShuffleNavBar"

export default function FlashcardContainer () {

    const { 
        flashcards,
        flashcardsNumber, 
        count, 
        currentFlashcard, 
        isCurrentFlashcardMastered,
        incrementCount, decrementCount,
        resetProgress, 
        increaseKnownCount, 
        setShuffledFlashcardsIds 
    } = useFlashcardContainerData()

    return(
        <div className={styles["flashcard-container"]}>
            <ShuffleNavBar 
                flashcards={flashcards} 
                setShuffledFlashcardsIds={setShuffledFlashcardsIds} 
            />
            <div className={styles["flashcard-container-main"]}>
                <Flashcard flashcard={currentFlashcard}/>
                <div>
                    <Button 
                        imgSrcName="icon-circle-check.svg"
                        text={isCurrentFlashcardMastered ? "Already Mastered" : "I Know This"}
                        variants="shadow" 
                        onClick={increaseKnownCount} 
                        disabled={isCurrentFlashcardMastered}
                    />
                    <Button imgSrcName="icon-reset.svg" text="Reset Progress" variants="shadow" onClick={resetProgress}/>
                </div>
            </div>
            <div className={styles["flashcard-container-footer"]}>
                <Button 
                    imgSrcName="icon-chevron-left.svg" 
                    text="Previous" 
                    onClick={decrementCount}
                    disabled={count === 0}
                />
                <p className="text-preset-5">{`Card ${count+1} of ${flashcardsNumber}`}</p>
                <Button 
                    imgSrcName="icon-chevron-right.svg" 
                    text="Next" 
                    variants="reverse"
                    onClick={incrementCount}
                    disabled={count === flashcardsNumber - 1}
                />
            </div>
        </div>
    )
}