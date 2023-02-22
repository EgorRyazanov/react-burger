import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({ handleToggleModal }) {
    return (
        <div onClick={handleToggleModal} className={styles.background}></div>
    );
}

ModalOverlay.propTypes = {
    handleToggleModal: PropTypes.func.isRequired,
};
