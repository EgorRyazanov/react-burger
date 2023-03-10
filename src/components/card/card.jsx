import React from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';
import PropTypes from 'prop-types';
import { dataElementProp } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { addDetailIngredientAction } from '../../services/actions/ingredient-details';

const getConstructorFromStore = (state) => state.constructorBurger;

const Card = React.memo(({ ingredient }) => {
    const location = useLocation();
    const ingredientId = ingredient['_id'];
    const dispatch = useDispatch();

    const { parts, bun } = useSelector(getConstructorFromStore);

    const [, drag] = useDrag(() => ({
        type: 'ингредиент',
        item: { ...ingredient },
    }));

    const handleClick = () => {
        dispatch(addDetailIngredientAction);
    };

    const counter = React.useMemo(() => {
        return [...parts, bun, bun]?.filter(
            (element) => element?._id === ingredient._id
        ).length;
    }, [bun, parts]);

    return (
        <Link
            key={ingredientId}
            to={`/ingredients/${ingredientId}`}
            state={{ background: location }}
            className={`${styles.card} mb-8`}
        >
            <div ref={drag} onClick={handleClick}>
                <div className={`pl-4 pr-4 ${styles.relative}`}>
                    {counter > 0 && (
                        <Counter
                            count={counter}
                            size='default'
                            extraClass='m-1'
                        />
                    )}
                    <img
                        className='mb-1'
                        src={ingredient.image}
                        alt='ингредиет'
                    />
                    <div className={`flex mb-1 ${styles.price}`}>
                        <p className='text text_type_digits-default mr-1'>
                            {ingredient.price}
                        </p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
                <p className={`text text_type_main-default ${styles.name}`}>
                    {ingredient.name}
                </p>
            </div>
        </Link>
    );
});

export default Card;

Card.propTypes = {
    ingredient: dataElementProp.isRequired,
};
