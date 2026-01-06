import { useRef, useState, type FormEvent } from "react";
import styles from "./EditModal.module.css";
import Button from "../../shared/Button/Button";
import useHandleClickOutside from "../../hooks/useHandleClickOutside";
import TextInput from "../../shared/TextInput/TextInput";
import IconCross from "../../assets/IconCross";
import type { Flashcard } from "../../types/types";

export default function EditModal({
    setShowEditModal,
    updateFlashcard,
    flashcard,
}: {
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    updateFlashcard: (flashcard: Flashcard, id: string) => Promise<void>;
    flashcard: Flashcard;
}) {

    const { id, question: initialQuestion, answer: initialAnswer, category: initialCategory, knownCount } = flashcard;

    const [question, setQuestion] = useState(initialQuestion || "");
    const [answer, setAnswer] = useState(initialAnswer || "");
    const [category, setCategory] = useState(initialCategory || "");
    const [errors, setErrors] = useState({ question: false, answer: false, category: false });

    const editModalRef = useRef<HTMLFormElement>(null);

    useHandleClickOutside(editModalRef, setShowEditModal);

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        //checks for data not empty
        const tempErrors = { question: !question, answer: !answer, category: !category };
        if(Object.values(tempErrors).every(value => !value)){
            await editCard();
        }
        setErrors(tempErrors);
    }

    const editCard = async () => {
        await updateFlashcard({
            id: id,
            question: question,
            answer: answer,
            category: category,
            knownCount: knownCount,
        }, id);
        setShowEditModal(false);
    }

    return (
        <form className={styles["edit-modal"]} ref={editModalRef} onSubmit={submit}>
            <button
                className={styles["edit-modal-close-button"]}
                onClick={() => setShowEditModal(false)}
                type="button"
                aria-label="Close modal"
            >
                <IconCross />
            </button>
            <h1>Edit your card</h1>
            <div>
                <TextInput
                    legend="Question"
                    placeholder="Enter your question..."
                    inputValue={question}
                    setInputValue={(e) => setQuestion(e.target.value)}
                    nameId="edit-question"
                    error={{errorState: errors.question, errorText: "Please enter a question."}}
                />
                <div className={styles["edit-modal-answer"]}>
                    <p className="text-preset-4-medium">Answer</p>
                    <textarea
                        placeholder="Enter your answer..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    {errors.answer && 
                        <div className={styles["error-msg"]}>
                            <img src="/assets/images/icon-error.svg" alt="Error Icon"/>
                            <p className="text-preset-5-regular">Please enter an answer.</p>
                        </div>
                    }
                </div>
                <TextInput
                    legend="Category"
                    placeholder="Enter your category..."
                    inputValue={category}
                    setInputValue={(e) => setCategory(e.target.value)}
                    nameId="edit-category"
                    error={{errorState: errors.category, errorText: "Please enter a category."}}
                />
            </div>
            <Button
                text="Update Card"
                onClick={() => {}}
                variants="shadow"
                type="submit"
            />
        </form>
    );
}
