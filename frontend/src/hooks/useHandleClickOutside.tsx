import { useEffect } from "react";

export default function useHandleClickOutside(
    modalRef: React.RefObject<Element | null>,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    buttonRef?: React.RefObject<HTMLButtonElement | null>,
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!buttonRef) {
                if (
                    modalRef.current &&
                    !modalRef.current.contains(event.target as Node)
                )
                    setModalVisible(false);
            } else if (
                modalRef.current &&
                buttonRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setModalVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, buttonRef, setModalVisible]);
}
