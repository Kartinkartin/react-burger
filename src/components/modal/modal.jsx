import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal({ title, children, onClose }) {
    const [isOpen, setIsOpen] = React.useState(true); 

    function onKey(e) {
        if (e.key==="Escape") { setIsOpen(false); onClose() }
    }
    React.useEffect(() => { 
        if(isOpen) { 
            document.addEventListener('keydown', onKey)
            return () => {
                document.removeEventListener('keydown', onKey);
            }
        }
    },[isOpen])
    return ReactDOM.createPortal(
        (<section className={styles.popup}>
            <ModalOverlay onClick={onClose} />
            <div className={styles.container + " pt-10 pb-15 pr-10 pl-10"}>
                <button className={styles.close_button} onClick={onClose} />
                <h2 className={styles.title +" text text_type_main-large"}>
                    {title}
                </h2>
                <>
                    {children}
                </>
            </div>
        </section>), document.getElementById('modals')
    )
}

Modal.propType = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}