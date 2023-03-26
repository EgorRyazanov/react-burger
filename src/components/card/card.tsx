import React, { FC, memo, useMemo } from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { TRootState } from '../../services/reducers/root';
import { TIngredient } from '../../utils/types/ingredient-type';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const getConstructorFromStore = (state: TRootState) => state.constructorBurger;

type TCard = {
    ingredient: TIngredient;
};

const Card: FC<TCard> = memo(({ ingredient }) => {
    const location = useLocation();
    const ingredientId = ingredient['_id'];

    const { parts, bun } = useTypedSelector(getConstructorFromStore);

    const [, drag] = useDrag(() => ({
        type: 'ингредиент',
        item: { ...ingredient },
    }));

    const counter = useMemo(() => {
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
            <div ref={drag}>
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
