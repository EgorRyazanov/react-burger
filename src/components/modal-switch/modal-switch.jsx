import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeDetailIngredientAction } from '../../services/actions/ingredient-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './modal-switch.module.css';
import PropTypes from 'prop-types';

const ModalSwitch = ({ background }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleToggleModal = () => {
        dispatch(removeDetailIngredientAction);
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
