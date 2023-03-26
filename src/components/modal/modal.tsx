import React, { FC, memo, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalContainer = document.getElementById(
    'modal-container'
) as HTMLElement;
const body = document.body;

type TModal = {
    handleToggleModal: () => void;
    title: string;
    container: string;
    children: ReactNode;
};

const Modal: FC<TModal> = memo(({ children, handleToggleModal, ...props }) => {
    const handleEscPressed = (event: KeyboardEvent) =>
        event.code === 'Escape' ? handleToggleModal() : null;

    useEffect(() => {
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
            onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === 'Enter') {
                    handleToggleModal();
                }
            }}
        >
            <ModalOverlay handleToggleModal={handleToggleModal} />
            <div className='flex'>
                <p className={`text text_type_main-large ${styles.title} mr-9`}>
                    {props.title || ''}
                </p>
                <button className={styles.button} onClick={handleToggleModal}>
                    <CloseIcon type='primary' />
                </button>
            </div>
            {children}
        </div>,
        modalContainer
    );
});

export default Modal;
