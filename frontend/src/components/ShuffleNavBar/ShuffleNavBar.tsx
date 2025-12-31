import styles from "./ShuffleNavBar.module.css"
import CategorySelect from "../../shared/CategorySelect/CategorySelect"
import CheckboxInput from "../../shared/CheckboxInput/CheckboxInput"
import Button from "../../shared/Button/Button"
import type { CategoryObj } from "../../shared/CategorySelect/CategorySelect"
import { useCallback, useState } from "react"
import type { Flashcard as FlashcardType } from "../../contexts/DataContext"
import { slugify } from "../../utils/slugify"

type ShuffleNavBarProps = {
    flashcards: FlashcardType[]
    setShuffledFlashcardsIds: React.Dispatch<React.SetStateAction<string[]>>
}

export type SelectedCategoryType = {[key: string]: boolean}

export default function ShuffleNavBar ({ flashcards, setShuffledFlashcardsIds }: ShuffleNavBarProps) {

    const [hideMastered, setHideMastered] = useState(false)

    // Gets the categories object array
    function getCategoriesObjArr () {
        const categoriesObjArr: CategoryObj[] = []
        flashcards.map(flashcard => {
            const { category } = flashcard
            const categoryObj = categoriesObjArr.find(obj => obj.category === flashcard.category)
            if(categoryObj === undefined) categoriesObjArr.push({ category, occurences: 1 })
                else categoryObj.occurences++
        })
        return categoriesObjArr
    }
    
    const categoriesObjArr = getCategoriesObjArr()
    
    // Gets the selected categories
    const [selectedCategories, setSelectedCategories] = useState<SelectedCategoryType>(() => {
        const initial: SelectedCategoryType = {}
        categoriesObjArr.forEach(categoryObj => {
            const sluggedCategory = slugify(categoryObj.category)
            initial[sluggedCategory] = false
        })
        return initial
    })
    
    const shuffleFlashcardsIds = useCallback(() => {
        
        const noCategoriesSelected = Object.values(selectedCategories).every(value => !value)
        
        // Filters the flashcards by categories
        let filteredFlashcards = flashcards.filter(flashcard => {
            
            if(noCategoriesSelected) return true
            const { category } = flashcard
            const sluggedCategory = slugify(category)
            return selectedCategories[sluggedCategory]
        })
        
        filteredFlashcards = filteredFlashcards.filter(flashcard => {
            if(hideMastered) return flashcard.knownCount < 5
            return true
        })
        
        const shuffledFlashcardsArr = []
        while(filteredFlashcards.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredFlashcards.length)
            shuffledFlashcardsArr.push(filteredFlashcards[randomIndex])
            filteredFlashcards.splice(randomIndex, 1)
        }
        
        setShuffledFlashcardsIds(shuffledFlashcardsArr.map(flashcard => flashcard.id))
    }, [flashcards, hideMastered, selectedCategories, setShuffledFlashcardsIds])
    


    return(
        <div className={styles["shuffle-nav-bar"]}>
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
                onClick={shuffleFlashcardsIds}
            />
        </div>
    )
}