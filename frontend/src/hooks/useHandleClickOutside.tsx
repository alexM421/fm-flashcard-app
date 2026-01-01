import { useEffect } from "react"

export default function useHandleClickOutside(modalRef: React.RefObject<HTMLDivElement | null>, buttonRef: React.RefObject<HTMLButtonElement | null>, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>) {

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current && 
                buttonRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setModalVisible(false)
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [modalRef, buttonRef, setModalVisible])
}