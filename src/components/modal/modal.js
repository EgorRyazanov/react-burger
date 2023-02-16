import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalContainer = document.getElementById('modal-container');
const body = document.body;

export default function Modal({ children, handleToggleModal, ...props }) {
    const handleEscPressed = (event) =>
        event.code === 'Escape' ? handleToggleModal() : null;

    React.useEffect(() => {
        body.style.overflow = 'hidden';
        modalContainer.classList.add('modal-container--active');
        document.addEventListener('keydown', handleEscPressed);
        return () => {
            modalContainer.classList.remove('modal-container--active');
            body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleEscPressed);
        };
    }, []);

    return ReactDOM.createPortal(
        <div
            className={`${styles.modal} ${props.container} pt-10 pl-10 pb-10 pr-10`}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    handleToggleModal();
                }
            }}
        >
            <ModalOverlay handleToggleModal={handleToggleModal} />
            <div className="flex">
                <p className={`text text_type_main-large ${styles.title} mr-9`}>
                    {props.title || ''}
                </p>
                <button className={styles.button} onClick={handleToggleModal}>
                    <CloseIcon type="primary" />
                </button>
            </div>
            {children}
        </div>,
        modalContainer
    );
}

Modal.propTypes = {
    handleToggleModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    container: PropTypes.string.isRequired,
};
