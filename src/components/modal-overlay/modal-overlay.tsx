import React, { FC, memo } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
    handleToggleModal: () => void;
};

const ModalOverlay: FC<TModalOverlay> = memo(({ handleToggleModal }) => {
    return (
        <div onClick={handleToggleModal} className={styles.background}></div>
    );
});

export default ModalOverlay;
