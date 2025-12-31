import { useCallback, useState } from "react"
import { useDataContext } from "../../../contexts/DataContext"
import type { Flashcard as FlashcardType } from "../../../contexts/DataContext"
import type { CategoryObj } from "../../../shared/CategorySelect/CategorySelect"
import { slugify } from "../../../utils/slugify"

export type SelectedCategoriesType = { [key: string]: boolean }

export default function useFlashcardContainerData() {
    
    const { flashcards, shuffledFlashcardsIds, setShuffledFlashcardsIds, setFlashcards } = useDataContext()
    const [count, setCount] = useState(0)
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
    const [selectedCategories, setSelectedCategories] = useState<SelectedCategoriesType>(() => {
        const initial: SelectedCategoriesType = {}
        categoriesObjArr.forEach(categoryObj => {
            const sluggedCategory = slugify(categoryObj.category)
            initial[sluggedCategory] = false
        })
        return initial
    })
    
    
    const currentFlashcard = flashcards.find(flashcard => flashcard.id === shuffledFlashcardsIds[count]) 
    const flashcardsNumber =  shuffledFlashcardsIds.length
    const isCurrentFlashcardMastered = (currentFlashcard?.knownCount || 0) >= 5 
    const currentFlashcardId = currentFlashcard?.id
    
    
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
    
    
    const increaseKnownCount = () => setFlashcards((prevFlashcards: FlashcardType[]) => {
        return prevFlashcards.map((flashcard) => flashcard.id === currentFlashcardId ? { ...flashcard, knownCount: flashcard.knownCount + 1 } : flashcard)
    })
    
    const resetProgress = () => setFlashcards((prevFlashcards: FlashcardType[]) => {
        return prevFlashcards.map((flashcard) => flashcard.id === currentFlashcardId ? { ...flashcard, knownCount: 0 } : flashcard)
    })

    const incrementCount = () => setCount(prevCount => prevCount + 1)
    const decrementCount = () => setCount(prevCount => prevCount - 1)

    return {
        flashcardsNumber,
        count,
        categoriesObjArr,
        currentFlashcard,
        selectedCategories,
        hideMastered,
        isCurrentFlashcardMastered,
        shuffleFlashcardsIds,
        setSelectedCategories,
        setHideMastered,
        incrementCount,
        decrementCount,
        increaseKnownCount,
        resetProgress
    }
}