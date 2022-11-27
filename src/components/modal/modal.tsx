import React, { useEffect, FunctionComponent } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

type TModalProps = {
    title?: string,
    children?: JSX.Element, 
    onClose: () => void
}
export const Modal: FunctionComponent<TModalProps> = ({ title = '', children, onClose }: TModalProps) => {
    const [isOpen, setIsOpen] = React.useState(true);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") { setIsOpen(false); onClose() }
        }
        if (isOpen) {
            document.addEventListener('keydown', onKey)
            return () => {
                document.removeEventListener('keydown', onKey);
            }
        }
    }, [isOpen, onClose])
    
    return ReactDOM.createPortal(
        (<section className={styles.popup}>
            <ModalOverlay onClick={onClose} />
                <div 
                className={`${styles.container} pt-10 pb-15 pr-10 pl-10`} 
                id='container' >
                    <button className={styles.close_button} onClick={onClose} />
                    <h2 className={`${styles.title} text text_type_main-large`}>
                        {title}
                    </h2>
                    <>
                        {children}
                    </>
                </div>
        </section>), document.getElementById('modals')!
    )
}
