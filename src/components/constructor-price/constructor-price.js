import React from 'react';
import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-price.module.css';
import PropTypes from 'prop-types';

export default function ConstructorPrice(props) {
    return (
        <div className={styles.container}>
            <div className={`${styles.price} mr-10`}>
                <p className="text text_type_digits-medium mr-2">
                    {props.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    );
}

ConstructorPrice.propTypes = {
    price: PropTypes.number.isRequired,
};
