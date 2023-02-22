import React from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';
import PropTypes from 'prop-types';
import { dataElementProp } from '../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { addDetailIngredientAction } from '../../services/actions/ingredient-details';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

const Card = React.memo(({ ingredient, handleToggleModal }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(addDetailIngredientAction(ingredient));
        handleToggleModal();
    };

    const { parts, bun } = useSelector((state) => state.constructorBurger);

    const [, drag] = useDrag(() => ({
        type: 'ингредиент',
        item: { ...ingredient },
    }));

    const counter = React.useMemo(() => {
        return [...parts, bun, bun]?.filter(
            (element) => element?._id === ingredient._id
        ).length;
    }, [bun, parts]);

    return (
        <div ref={drag} onClick={handleClick} className={`${styles.card} mb-8`}>
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
    handleToggleModal: PropTypes.func.isRequired,
};
