import React, { FC, memo, useState } from 'react';
import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-price.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearConstructorAction } from '../../services/actions/constructor';
import LoadingModal from '../loading-modal/loading-modal';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { TRootState } from '../../services/reducers/root';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { makeOrderAction } from '../../services/actions/order-details';

const getOrderFromStore = (state: TRootState) => state.orderDetail;

type TConstructorPrice = {
    price: number;
    id: Array<string>;
    userLoaded: boolean;
};

const ConstructorPrice: FC<TConstructorPrice> = memo(
    ({ price, id, userLoaded }) => {
        const location = useLocation();
        const navigate = useNavigate();
        const dispatch = useTypedDispatch();
        const { fetchOrderRequest, fetchOrderFailed, order } =
            useTypedSelector(getOrderFromStore);
        const [active, setActive] = useState(false);
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
                    data-testid='order-button'
                    onClick={!active ? handleToggleModal : () => {}}
                    htmlType='button'
                    type='primary'
                    disabled={price === 0}
                    size='large'
                >
                    Оформить заказ
                </Button>
                {active && fetchOrderRequest && (
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
                        <OrderDetails number={order.number} />
                    </Modal>
                )}
            </div>
        );
    }
);

export default ConstructorPrice;
