import React, { FC, memo, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TRootState } from '../../services/reducers/root';

const modalContainer = document.getElementById(
    'modal-container'
) as HTMLElement;
const body = document.body;

type TModal = {
    handleToggleModal: () => void;
    title?: string;
    container: string;
    children: ReactNode;
};

const getWS = (state: TRootState) => state.websocket;

const Modal: FC<TModal> = memo(({ children, handleToggleModal, ...props }) => {
    const handleEscPressed = (event: KeyboardEvent) =>
        event.code === 'Escape' ? handleToggleModal() : null;
    const { id } = useParams();
    const [title, setTitle] = React.useState<string | null>(null);
    const { ordersInformation } = useTypedSelector(getWS);
    useEffect(() => {
        if (id && ordersInformation) {
            setTitle(
                `#000${
                    ordersInformation.orders.filter(
                        (order) => order._id === id
                    )[0].number
                }`
            );
        } else {
            setTitle(props.title || '');
        }
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
            data-testid='modal'
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
                    {title}
                </p>
                <button
                    data-testid='close-button'
                    className={styles.button}
                    onClick={handleToggleModal}
                >
                    <CloseIcon type='primary' />
                </button>
            </div>
            {children}
        </div>,
        modalContainer
    );
});

export default Modal;
