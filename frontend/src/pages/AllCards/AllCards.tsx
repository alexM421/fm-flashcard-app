import styles from "./AllCards.module.css"
import AllCardsForm from "./AllCardsForm/AllCardsForm"
import ShuffleNavBar from "../../components/ShuffleNavBar/ShuffleNavBar"
import useFlashcardLogicData from "../../hooks/useFlashcardLogicData"
import AllCardsList from "./AllCardsList/AllCardsList"

export default function AllCards () {

    const { flashcards, shuffleFlashcards } = useFlashcardLogicData()

    return(
        <div className={styles["all-cards"]}>
            <AllCardsForm />
            <ShuffleNavBar
                flashcards={flashcards}
                shuffleFlashcards={shuffleFlashcards}
            />
            <AllCardsList flashcards={flashcards} />
        </div>
    )
}