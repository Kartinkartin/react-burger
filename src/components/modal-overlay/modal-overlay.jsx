import React from "react";
import "./modal-overlay.css"

export default function ModalOverlay({ onClick }) {
    return (
        <div className="overlay" onClick={onClick} />
    )
}