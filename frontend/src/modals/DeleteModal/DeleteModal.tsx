import { useRef } from "react";
import styles from "./DeleteModal.module.css";
import Button from "../../shared/Button/Button";
import useHandleClickOutside from "../../hooks/useHandleClickOutside";

export default function DeleteModal({
    setShowDeleteModal,
    deleteFlashcard,
}: {
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    deleteFlashcard: () => void | Promise<void>;
}) {
    const deleteModalRef = useRef<HTMLDivElement>(null);

    useHandleClickOutside(deleteModalRef, setShowDeleteModal);

    const handleDelete = async () => {
        try {
            await deleteFlashcard();
        } catch (error) {
            console.error("Failed to delete flashcard:", error);
            // Modal stays open on error so user can retry
        }
    };

    return (
        <div className={styles["delete-modal"]} ref={deleteModalRef}>
            <div className={styles["delete-modal-content"]}>
                <h1 className="text-preset-2">Delete this card?</h1>
                <p className="text-preset-4-regular">
                    This action can't be undone.
                </p>
            </div>
            <hr />
            <div className={styles["delete-modal-buttons"]}>
                <Button
                    text="Cancel"
                    onClick={() => setShowDeleteModal(false)}
                />
                <Button
                    text="Delete Card"
                    onClick={handleDelete}
                    variants="shadow"
                />
            </div>
        </div>
    );
}
