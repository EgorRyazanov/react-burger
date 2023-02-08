import React from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { dataElementProp } from '../../utils/prop-types';

const Card = React.memo((props) => {
    const [counter, setCounter] = React.useState(Math.round(Math.random()));
    const [active, setActive] = React.useState(false);
    const handleToggleModal = () => {
        setActive(!active);
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
                <img className="mb-1" src={props.image} alt="ингредиет" />
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
            {active && (
                <IngredientDetails
                    handleToggleModal={handleToggleModal}
                    ingredient={props.ingredient}
                />
            )}
        </div>
    );
});

export default Card;

Card.propTypes = {
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ingredient: PropTypes.object.isRequired, // знаю, что так неправильно, но не знаю, как фиксануть
    // ingredient: PropTypes.objectOf(dataElementProp.isRequired).isRequired
    // Выводит: Failed prop type: Invalid prop `ingredient._id` of type `string` supplied to `Memo`, expected `object`.
};
