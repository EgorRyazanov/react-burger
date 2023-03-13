import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './modal-switch.module.css';
import PropTypes from 'prop-types';

const ModalSwitch = ({ background }) => {
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

ModalSwitch.propTypes = {
    background: PropTypes.object,
};

export default ModalSwitch;
