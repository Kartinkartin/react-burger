import React, { FunctionComponent } from "react";
import styles from "./modal-overlay.module.css"

type TOverlayProps = { 
    onClick: any
}
export const ModalOverlay: FunctionComponent<TOverlayProps> = ({ onClick }: TOverlayProps) => {
    return (
        <div className={styles.overlay} onClick={onClick} />
    )
}
