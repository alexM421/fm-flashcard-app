import type { Flashcard as FlashcardType } from "../../../types/types";
import KnowledgeCount from "../../../shared/KnwoledgeCount/KnowledgeCount";
import styles from "./FlashcardContainer.module.css";
import { useState } from "react";

type FlashcardProps = {
  flashcard: FlashcardType | undefined;
};

export default function Flashcard({ flashcard }: FlashcardProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!flashcard) return null;

  const { knownCount, category, question, answer } = flashcard;

  return (
    <div
      className={`${styles["flashcard"]} ${isRevealed ? styles["flashcard-revealed"] : ""}`}
    >
      {isRevealed ? (
        <img
          src={"/assets/images/pattern-star-pink.svg"}
          alt="pattern-star-pink"
          className={styles["flashcard-star-top"]}
        />
      ) : (
        <img
          src={"/assets/images/pattern-star-blue.svg"}
          alt="pattern-star-blue"
          className={styles["flashcard-star-top"]}
        />
      )}
      <img
        src={"/assets/images/pattern-star-yellow.svg"}
        alt="pattern-star-yellow"
        className={styles["flashcard-star-bottom"]}
      />
      <p className="text-preset-6">{category}</p>
      <div className={styles["flashcard-main"]}>
        <h1 className="text-preset-1">{isRevealed ? answer : question}</h1>
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className="text-preset-4-medium"
        >
          {!isRevealed ? "Click to reveal answer" : "Answer :"}
        </button>
      </div>
      <KnowledgeCount knownCount={knownCount} />
    </div>
  );
}
