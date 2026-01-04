import styles from "./AllCardsList.module.css";
import type { Flashcard } from "../../../types/types";
import KnowledgeCount from "../../../shared/KnwoledgeCount/KnowledgeCount";
import { useState, useRef } from "react";
import MenuModal from "../../../modals/MenuModal/MenuModal";

export default function FlashcardCard({ flashcard }: { flashcard: Flashcard }) {
  const { question, answer, category, knownCount } = flashcard;

  const [showMenuModal, setShowMenuModal] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles["flashcard-card"]}>
      <h1 className="text-preset-3">{question}</h1>
      <div className={styles["flashcard-card-answer"]}>
        <p className="text-preset-5">Answer:</p>
        <p className="text-preset-5">{answer}</p>
      </div>
      <div className={styles["flashcard-card-footer"]}>
        <div className={styles["flashcard-card-category"]}>
          <p className="text-preset-6">{category}</p>
        </div>
        <div className={styles["flashcard-card-known-count"]}>
          {knownCount === 5 ? (
            <div className={styles["flashcard-card-mastered"]}>
              <img
                src={"/assets/images/icon-stats-mastered.svg"}
                alt="icon-stats-mastered"
              />
              <p className="text-preset-6">Mastered 5/5</p>
            </div>
          ) : (
            <KnowledgeCount knownCount={knownCount} />
          )}
        </div>
        <div className={styles["flashcard-card-menu"]}>
          <div className={styles["flashcard-card-menu-button"]}>
            <button
              aria-label="Open menu for this flashcard"
              onClick={() => setShowMenuModal(!showMenuModal)}
              ref={menuButtonRef}
            >
              <img src={"/assets/images/icon-menu.svg"} alt="icon-menu" />
            </button>
            <MenuModal
              showMenuModal={showMenuModal}
              setShowMenuModal={setShowMenuModal}
              buttonRef={menuButtonRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
