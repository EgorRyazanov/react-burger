import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = React.memo(({ handleToggleModal }) => {
    return (
        <div onClick={handleToggleModal} className={styles.background}></div>
    );
});

ModalOverlay.propTypes = {
    handleToggleModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
