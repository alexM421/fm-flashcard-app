import styles from "./AllCardsForm.module.css";
import TextInput from "../../../shared/TextInput/TextInput";
import Button from "../../../shared/Button/Button";

import { useState, type FormEvent } from "react";
import { useDataContext } from "../../../contexts/DataContext";

export default function AllCardsForm() {

    const { createFlashcard } = useDataContext()

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({
        question: false,
        answer: false,
        category: false
    })
    const [serverError, setServerError] = useState({ error: false, message: ""})

    const submit = async (e: FormEvent) => {
        e.preventDefault()

        //checks for data not empty
        const tempErrors = { question: false, answer: false, category: false}
        tempErrors.question = !question
        tempErrors.answer = !answer
        tempErrors.category = !category

        if(Object.values(tempErrors).every(value => !value)){


            const randomid = "fc" + Math.floor(1000 + Math.random() * 9000).toString();

            const newFlashcard = {
                id: randomid,
                question: question,
                answer: answer,
                category: category,
                knownCount: 0
            }

            try {
                await createFlashcard(newFlashcard);
                setServerError({ error: false, message: "" });
            } catch {
                const errorMessage = "An unexpected error has occurred.";
                setServerError({
                    error: true,
                    message: errorMessage
                });
            }

            setQuestion("")
            setAnswer("")
            setCategory("")
        }
        //send data
        //manage errors state
        setErrors(tempErrors)

    }

    return (
        <form className={styles["all-cards-form"]} onSubmit={submit}>
            <TextInput
                legend="Question"
                placeholder="e.g., What is the capital of France?"
                inputValue={question}
                setInputValue={(e) => setQuestion(e.target.value)}
                nameId="question"
                error={{errorState: errors.question, errorText: "Please enter a question."}}
            />
            <TextInput
                legend="Answer"
                placeholder="e.g., Paris"
                inputValue={answer}
                setInputValue={(e) => setAnswer(e.target.value)}
                nameId="answer"
                error={{errorState: errors.answer, errorText: "Please enter an answer."}}
            />
            <TextInput
                legend="Category"
                placeholder="e.g., Geography"
                inputValue={category}
                setInputValue={(e) => setCategory(e.target.value)}
                nameId="category"
                error={{errorState: errors.category, errorText: "Please enter a category."}}
            />

            <div className={styles["form-footer"]}>
                <Button
                    text="Create Card"
                    imgSrcName="icon-circle-plus.svg"
                    variants="shadow"
                    onClick={() => {}}
                    type="submit"
                />
                {serverError.error && <div className={styles["error-div"]}>
                    <img src="/assets/images/icon-error.svg" alt="error-icon" />
                    <p className="text-preset-5-regular">{serverError.message}</p>
                </div>}
            </div>
        </form>
    );
}
