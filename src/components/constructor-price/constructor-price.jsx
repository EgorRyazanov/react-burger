import React from 'react';
import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-price.module.css';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { makeOrderAction } from '../../services/actions/order-details';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearConstructorAction } from '../../services/actions/constructor';
import LoadingModal from '../loading-modal/loading-modal';

const getOrderFromStore = (state) => state.orderDetail;

const ConstructorPrice = React.memo(({ price, id, userLoaded }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { fetchOrderRequest, fetchOrderFailed, order } =
        useSelector(getOrderFromStore);
    const [active, setActive] = React.useState(false);
    const handleToggleModal = () => {
        if (!userLoaded) {
            navigate('/login', {
                state: {
                    from: location,
                },
            });
        } else {
            if (price !== 0) {
                if (!active) {
                    dispatch(makeOrderAction(id));
                } else {
                    dispatch(clearConstructorAction);
                }
                setActive(!active);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.price} mr-10`}>
                <p className='text text_type_digits-medium mr-2'>{price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <Button
                onClick={!active ? handleToggleModal : null}
                htmlType='button'
                type='primary'
                disabled={price === 0}
                size='large'
            >
                Оформить заказ
            </Button>
            {active && order && fetchOrderRequest && (
                <Modal
                    handleToggleModal={handleToggleModal}
                    title={''}
                    container={styles.modal}
                >
                    <LoadingModal />
                </Modal>
            )}
            {active && order && !fetchOrderRequest && !fetchOrderFailed && (
                <Modal
                    handleToggleModal={handleToggleModal}
                    title={''}
                    container={styles.modal}
                >
                    <OrderDetails number={order.order.number} />
                </Modal>
            )}
        </div>
    );
});

ConstructorPrice.propTypes = {
    price: PropTypes.number.isRequired,
    id: PropTypes.arrayOf(PropTypes.string).isRequired,
    userLoaded: PropTypes.bool.isRequired,
};

export default ConstructorPrice;
