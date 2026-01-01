import { useRef } from "react"
import styles from "./MenuModal.module.css"
import useHandleClickOutside from "../../hooks/useHandleClickOutside"

export default function MenuModal({ showMenuModal, setShowMenuModal, buttonRef }: { 
    showMenuModal: boolean, 
    setShowMenuModal: React.Dispatch<React.SetStateAction<boolean>>, 
    buttonRef: React.RefObject<HTMLButtonElement | null> 
}) {

    const menuModalRef = useRef<HTMLDivElement>(null)

    useHandleClickOutside(menuModalRef,buttonRef, setShowMenuModal)


    return(
        <div className={`${styles["menu-modal"]} ${showMenuModal ? styles["show"] : ""}`} ref={menuModalRef}>
            <button className={styles["menu-modal-edit-button"]}>
                <img src="/assets/images/icon-edit.svg" alt="edit" />
                <p className="text-preset-5">Edit</p>
            </button>
            <hr />  
            <button className={styles["menu-modal-delete-button"]}>
                <img src="/assets/images/icon-delete.svg" alt="delete" />
                <p className="text-preset-5">Delete</p>
            </button>
        </div>
    )
}