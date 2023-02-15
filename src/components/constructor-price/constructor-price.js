import React from 'react';
import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-price.module.css';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import { getOrder } from '../../utils/api';

export default function ConstructorPrice({ price, id }) {
    const [order, setOrder] = React.useState({
        name: '',
        number: 0,
        success: false,
    });
    const [data, setData] = React.useState('');
    const [active, setActive] = React.useState(false);
    const handleToggleModal = () => {
        setActive(!active);
        getOrder(id).then((res) => {
            setData(res);
        });
    };

    React.useEffect(() => {
        setOrder({ ...data });
    }, [data]);

    React.useEffect(() => {
        getOrder(id).then((res) => {
            setData(res);
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={`${styles.price} mr-10`}>
                <p className="text text_type_digits-medium mr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button
                onClick={!active ? handleToggleModal : null}
                htmlType="button"
                type="primary"
                size="large"
            >
                Оформить заказ
            </Button>
            {active && (
                <OrderDetails
                    handleToggleModal={handleToggleModal}
                    number={order.order.number}
                />
            )}
        </div>
    );
}

ConstructorPrice.propTypes = {
    price: PropTypes.number.isRequired,
    id: PropTypes.arrayOf(PropTypes.string).isRequired,
};
