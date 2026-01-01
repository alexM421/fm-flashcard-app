import Button from "../../../shared/Button/Button"
import styles from "./FlashcardContainer.module.css"
import Flashcard from "./Flashcard"
import useFlashcardLogicData from "../../../hooks/useFlashcardLogicData"
import ShuffleNavBar from "../../../components/ShuffleNavBar/ShuffleNavBar"

export default function FlashcardContainer () {

    const { 
        flashcards,
        totalFlashcards, 
        currentIndex, 
        currentFlashcard, 
        isCurrentFlashcardMastered,
        incrementCount, decrementCount,
        resetProgress, 
        increaseKnownCount, 
        shuffleFlashcards 
    } = useFlashcardLogicData()

    return(
        <div className={styles["flashcard-container"]}>
            <ShuffleNavBar 
                flashcards={flashcards} 
                shuffleFlashcards={shuffleFlashcards} 
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
                    disabled={currentIndex === 0}
                />
                <p className="text-preset-5">{`Card ${currentIndex+1} of ${totalFlashcards}`}</p>
                <Button 
                    imgSrcName="icon-chevron-right.svg" 
                    text="Next" 
                    variants="reverse"
                    onClick={incrementCount}
                    disabled={currentIndex === totalFlashcards - 1}
                />
            </div>
        </div>
    )
}