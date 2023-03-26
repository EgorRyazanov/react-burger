import React, { FC } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './modal-switch.module.css';

type TModalSwitch = {
    background: {
        pathname: string;
        search: string;
        hash: string;
        state: any;
        key: string;
    };
};

const ModalSwitch: FC<TModalSwitch> = ({ background }) => {
    const navigate = useNavigate();
    const handleToggleModal = () => {
        navigate('/', { replace: true });
    };
    return (
        <>
            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal
                                title={'Детали ингредиента'}
                                container={styles.modal}
                                handleToggleModal={handleToggleModal}
                            >
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
};

export default ModalSwitch;
