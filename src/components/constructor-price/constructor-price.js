import React from 'react';
import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-price.module.css';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';

export default function ConstructorPrice({ price }) {
    const [active, setActive] = React.useState(false);
    const handleToggleModal = () => {
        setActive(!active);
    };

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
            {active && <OrderDetails handleToggleModal={handleToggleModal} />}
        </div>
    );
}

ConstructorPrice.propTypes = {
    price: PropTypes.number.isRequired,
};
