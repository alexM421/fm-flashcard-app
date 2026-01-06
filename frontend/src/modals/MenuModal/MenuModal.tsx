import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MenuModal.module.css";
import useHandleClickOutside from "../../hooks/useHandleClickOutside";
import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import BackgroundModal from "../BackgroundModal/BackgroundModal";
import { useDataContext } from "../../contexts/DataContext";
import type { Flashcard } from "../../types/types";

export default function MenuModal({
    showMenuModal,
    setShowMenuModal,
    buttonRef,
    flashcard,
}: {
    showMenuModal: boolean;
    setShowMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
    flashcard: Flashcard;
}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const menuModalRef = useRef<HTMLDivElement>(null);

    useHandleClickOutside(menuModalRef, setShowMenuModal, buttonRef);

    const { deleteFlashcard, updateFlashcard } = useDataContext()
    
    const deleteCard = async () => {
        await deleteFlashcard(flashcard.id);
        setShowDeleteModal(false);
    }

    return (
        <>
            <div
                className={`${styles["menu-modal"]} ${showMenuModal ? styles["show"] : ""}`}
                ref={menuModalRef}
            >
                <button
                    className={styles["menu-modal-edit-button"]}
                    onClick={() => setShowEditModal(true)}
                >
                    <img src="/assets/images/icon-edit.svg" alt="edit" />
                    <p className="text-preset-5">Edit</p>
                </button>
                <hr />
                <button
                    className={styles["menu-modal-delete-button"]}
                    onClick={() => setShowDeleteModal(true)}
                >
                    <img src="/assets/images/icon-delete.svg" alt="delete" />
                    <p className="text-preset-5">Delete</p>
                </button>
            </div>
            {createPortal(
                showEditModal && (
                    <>
                        <BackgroundModal />
                        <EditModal setShowEditModal={setShowEditModal} updateFlashcard={updateFlashcard} flashcard={flashcard} />
                    </>
                ),
                document.getElementById("root")!,
            )}
            {createPortal(
                showDeleteModal && (
                    <>
                        <BackgroundModal />
                        <DeleteModal setShowDeleteModal={setShowDeleteModal} deleteFlashcard={deleteCard} />
                    </>
                ),
                document.getElementById("root")!,
            )}
        </>
    );
}
