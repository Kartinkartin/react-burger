import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal({ title, children, onClose }) {
    React.useEffect(() => {
        document.addEventListener('keydown', onClose)
        return () => {
            document.removeEventListener('keydown', onClose);
        }
    },[])
    return ReactDOM.createPortal(
        (<section className={styles.popup}>
            <ModalOverlay onClick={onClose} />
            <div className={styles.container + " pt-10 pb-15 pr-10 pl-10"}>
                <button className={styles.close_button} onClick={onClose} />
                <h2 className="title text text_type_main-large">
                    {title}
                </h2>
                <>
                    {children}
                </>
            </div>
        </section>), document.getElementById('modals')
    )
}