import styles from "./AllCards.module.css"
import AllCardsForm from "./AllCardsForm/AllCardsForm"
import { useDataContext } from "../../contexts/DataContext"
import ShuffleNavBar from "../../components/ShuffleNavBar/ShuffleNavBar"

export default function AllCards () {

    const { flashcards, setShuffledFlashcardsIds } = useDataContext()

    return(
        <div className={styles["all-cards"]}>
            <AllCardsForm />
            <ShuffleNavBar
                flashcards={flashcards}
                setShuffledFlashcardsIds={setShuffledFlashcardsIds}
            />
        </div>
    )
}