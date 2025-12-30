import Button from "../../../shared/Button/Button"
import CheckboxInput from "../../../shared/CheckboxInput/CheckboxInput"
import CategorySelect from "../../../shared/CategorySelect/CategorySelect"
import styles from "./FlashcardContainer.module.css"
import Flashcard from "./Flashcard"
import useFlashcardContainerData from "./useFlashcardContainerData"

export default function FlashcardContainer () {

    const { 
        flashcardsNumber, 
        count, 
        currentFlashcard, 
        isMastered,
        categoriesObjArr, 
        selectedCategories, 
        hideMastered, 
        incrementCount, decrementCount,
        resetProgress, 
        shuffleFlashcards, 
        increaseKnownCount, 
        setSelectedCategories, 
        setHideMastered 
    } = useFlashcardContainerData()

    return(
        <div className={styles["flashcard-container"]}>
            <div className={styles["flashcard-container-header"]}>
                <CategorySelect 
                    categoryObjArr={categoriesObjArr}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
                <div className={styles["hide-mastered"]}>
                    <CheckboxInput id="hide-mastered" onChange={() => setHideMastered(!hideMastered)} value={hideMastered} />
                    <p className="text-preset-4-medium">Hide Mastered</p>
                </div>
                <Button 
                    imgSrcName="icon-shuffle.svg" 
                    text="shuffle" 
                    onClick={shuffleFlashcards}
                />
            </div>
            <div className={styles["flashcard-container-main"]}>
                <Flashcard flashcard={currentFlashcard}/>
                <div>
                    <Button 
                        imgSrcName="icon-circle-check.svg"
                        text={isMastered ? "Already Mastered" : "I Know This"}
                        variants="shadow" 
                        onClick={increaseKnownCount} 
                        disabled={isMastered}
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