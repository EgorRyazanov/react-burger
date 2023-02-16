import React from 'react';
import styles from './modal-overlay.module.css';

export default function ModalOverlay({ handleToggleModal }) {
    return (
        <div onClick={handleToggleModal} className={styles.background}></div>
    );
}
