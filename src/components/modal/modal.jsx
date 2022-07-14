import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal({ title, children, onClose }) {
    React.useEffect(() => {
        document.addEventListener('keydown', onClose)
        return () => {
            document.removeEventListener('keydown', onClose);
        }
    },[])
    return ReactDOM.createPortal(
        (<section className="popup">
            <ModalOverlay onClick={onClose} />
            <div className="container pt-10 pb-15 pr-10 pl-10">
                <button className='close_button' onClick={onClose} />
                <h2 className="title text text_type_main-large">
                    {title}
                </h2>
                <>
                    {children}
                </>
            </div>
        </section>), document.querySelector('.App')
    )
}