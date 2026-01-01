import styles from "./AllCards.module.css"
import AllCardsForm from "./AllCardsForm/AllCardsForm"
import ShuffleNavBar from "../../components/ShuffleNavBar/ShuffleNavBar"
import useFlashcardLogicData from "../../hooks/useFlashcardLogicData"
import AllCardsList from "./AllCardsList/AllCardsList"

export default function AllCards () {

    const { flashcards, shuffleFlashcards, shuffledFlashcardsIds, hideMastered, setHideMastered } = useFlashcardLogicData()


    if(flashcards.length === 0) {
        return(
            <div className={styles["all-cards"]}>
                <AllCardsForm />
                <div className={styles["all-cards-empty"]}>
                    <h1 className="text-preset-2">No cards yet</h1>
                    <p className="text-preset-4-regular">Add your first card using the form above and it will show up here.</p>
                </div>
            </div>
        )
    }
    return(
        <div className={styles["all-cards"]}>
            <AllCardsForm />
            <ShuffleNavBar
                flashcards={flashcards}
                shuffleFlashcards={shuffleFlashcards}
                noPadding={true}
                hideMastered={hideMastered}
                setHideMastered={setHideMastered}
            />
            <AllCardsList flashcards={flashcards} shuffledFlashcardsIds={shuffledFlashcardsIds} />
        </div>
    )
}