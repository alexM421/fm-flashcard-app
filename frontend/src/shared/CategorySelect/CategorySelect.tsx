import styles from "./CategorySelect.module.css"
import Button from "../Button/Button"
import CheckboxInput from "../CheckboxInput/CheckboxInput"
import { useRef, useState, useEffect } from "react"
import { slugify } from "../../utils/slugify"
import type { SelectedCategoryType } from "../../types/types"

export type CategoryObj = {
    category: string,
    occurences: number
}

type CategorySelectProps = {
    categoryObjArr: CategoryObj[]
    selectedCategories: SelectedCategoryType
    setSelectedCategories: React.Dispatch<React.SetStateAction<SelectedCategoryType>>
}

export default function CategorySelect ({ categoryObjArr, selectedCategories, setSelectedCategories }: CategorySelectProps) {

    const [isVisible, setIsVisible] = useState(false)
    
    // Checks if the user clicks outside the category selection or the button
    const selectionRef = useRef<HTMLDivElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectionRef.current && 
                btnRef.current &&
                !selectionRef.current.contains(event.target as Node) &&
                !btnRef.current.contains(event.target as Node)
            ) {
                setIsVisible(false)
            }
        }
    
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside)
        }
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isVisible])

    return(
        <div className={styles["category-select"]}>
            <Button 
                imgSrcName="icon-chevron-down.svg" 
                text="All Categories" 
                variants="reverse"
                ref={btnRef}
                onClick={() => setIsVisible(prevState => !prevState)}
            />
            <div className={`${styles["categories-selection"]} ${isVisible? styles["visible"]:""}`} ref={selectionRef}>
                {categoryObjArr.map(categoryObj => {

                    const { category, occurences } = categoryObj
                    const sluggedCategory = slugify(category) 

                    return(
                        <label 
                            className={styles["category-item"]} key={sluggedCategory}
                            htmlFor={`${sluggedCategory}-id`}
                        >    
                            <CheckboxInput 
                                id={`${sluggedCategory}-id`}
                                onChange={() => {
                                    setSelectedCategories((prevSelectedCategories: SelectedCategoryType) => ({
                                        ...prevSelectedCategories,
                                        [sluggedCategory]: !prevSelectedCategories[sluggedCategory]
                                    }))
                                }}
                                value={selectedCategories[sluggedCategory] ?? false}
                            />
                            <p className="text-preset-5">{category} <span>({occurences})</span></p>
                        </label>
                    )
                })}
            </div>      
        </div>
    )
}