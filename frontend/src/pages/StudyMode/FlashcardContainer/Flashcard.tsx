import type { Flashcard as FlashcardType } from "../../../types/types";
import KnowledgeCount from "../../../shared/KnwoledgeCount/KnowledgeCount";
import styles from "./FlashcardContainer.module.css";
import { useState } from "react";
import FlashcardAnimatedText from "./FlashcardAnimatedText";

type FlashcardProps = {
    flashcard: FlashcardType | undefined;
};

export default function Flashcard({ flashcard }: FlashcardProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    if (!flashcard) return null;

    const { knownCount, category, question, answer } = flashcard;

    return (
        <button
            onClick={() => setIsRevealed(!isRevealed)}
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
            <FlashcardAnimatedText question={question} answer={answer} isRevealed={isRevealed} />
            <KnowledgeCount knownCount={knownCount} />
        </button>
    );
}
