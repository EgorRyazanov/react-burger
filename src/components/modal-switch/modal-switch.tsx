import React, { FC } from 'react';
import {
    useNavigate,
    Route,
    Routes,
    useParams,
    useLocation,
} from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './modal-switch.module.css';
import FeedOrder from '../feed-details/feed-details';

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
        navigate(background, { replace: true });
    };
    return (
        <>
            {background && (
                <Routes>
                    <Route
                        path='/feed/:id'
                        element={
                            <Modal
                                container={styles.modal__feed_order}
                                handleToggleModal={handleToggleModal}
                            >
                                <FeedOrder />
                            </Modal>
                        }
                    />
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal
                                title={'Детали ингредиента'}
                                container={styles.modal__ingredient_details}
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
