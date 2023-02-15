import React from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';
import PropTypes from 'prop-types';
import { dataElementProp } from '../../utils/prop-types';

const Card = React.memo(({ ingredient, setModalData, setActive, active }) => {
    const [counter, setCounter] = React.useState(Math.round(Math.random()));
    const handleToggleModal = () => {
        setActive(!active);
        setModalData({ ...ingredient });
    };

    return (
        <div
            onClick={!active ? handleToggleModal : null}
            className={`${styles.card} mb-8`}
        >
            <div className={`pl-4 pr-4 ${styles.relative}`}>
                {counter > 0 && (
                    <Counter count={counter} size="default" extraClass="m-1" />
                )}
                <img className="mb-1" src={ingredient.image} alt="ингредиет" />
                <div className={`flex mb-1 ${styles.price}`}>
                    <p className="text text_type_digits-default mr-1">
                        {ingredient.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            <p className={`text text_type_main-default ${styles.name}`}>
                {ingredient.name}
            </p>
        </div>
    );
});

export default Card;

Card.propTypes = {
    ingredient: dataElementProp.isRequired,
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired,
    setModalData: PropTypes.func.isRequired,
};
