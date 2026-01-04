import { useRef, useState } from "react";
import styles from "./EditModal.module.css";
import Button from "../../shared/Button/Button";
import useHandleClickOutside from "../../hooks/useHandleClickOutside";
import TextInput from "../../shared/TextInput/TextInput";
import IconCross from "../../assets/IconCross";

export default function EditModal({
  setShowEditModal,
}: {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");

  const editModalRef = useRef<HTMLFormElement>(null);

  useHandleClickOutside(editModalRef, setShowEditModal);

  return (
    <form className={styles["edit-modal"]} ref={editModalRef}>
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
        />
        <div className={styles["edit-modal-answer"]}>
          <p className="text-preset-4-medium">Answer</p>
          <textarea
            placeholder="Enter your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <TextInput
          legend="Category"
          placeholder="Enter your category..."
          inputValue={category}
          setInputValue={(e) => setCategory(e.target.value)}
          nameId="edit-category"
        />
      </div>
      <Button
        text="Update Card"
        onClick={() => {
          setShowEditModal(false);
        }}
        variants="shadow"
      />
    </form>
  );
}
