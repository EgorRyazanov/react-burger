import React from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';
import PropTypes from 'prop-types';

const Card = React.memo((props) => {
    const [counter, setCounter] = React.useState(0);

    const handleCounter = () => {
        setCounter(counter + 1);
    };

    return (
        <div onClick={handleCounter} className={`${styles.card} mb-8`}>
            <div className={`pl-4 pr-4 ${styles.relative}`}>
                {counter > 0 && (
                    <Counter count={counter} size="default" extraClass="m-1" />
                )}
                <img className="mb-1" src={props.image} alt="ингридиет" />
                <div className={`flex mb-1 ${styles.price}`}>
                    <p className="text text_type_digits-default mr-1">
                        {props.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            <p className={`text text_type_main-default ${styles.name}`}>
                {props.name}
            </p>
        </div>
    );
});

export default Card;

Card.propTypes = {
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
