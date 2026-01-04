import styles from "./AllCardsForm.module.css";
import TextInput from "../../../shared/TextInput/TextInput";
import Button from "../../../shared/Button/Button";
import { useState } from "react";

export default function AllCardsForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");

  return (
    <form className={styles["all-cards-form"]}>
      <TextInput
        legend="Question"
        placeholder="e.g., What is the capital of France?"
        inputValue={question}
        setInputValue={(e) => setQuestion(e.target.value)}
        nameId="question"
      />
      <TextInput
        legend="Answer"
        placeholder="e.g., Paris"
        inputValue={answer}
        setInputValue={(e) => setAnswer(e.target.value)}
        nameId="answer"
      />
      <TextInput
        legend="Category"
        placeholder="e.g., Geography"
        inputValue={category}
        setInputValue={(e) => setCategory(e.target.value)}
        nameId="category"
      />

      <Button
        text="Create Card"
        imgSrcName="icon-circle-plus.svg"
        variants="shadow"
        onClick={() => {}}
      />
    </form>
  );
}
