import React, { forwardRef, memo, ForwardedRef } from 'react';
import Card from '../card/card';
import styles from './ingredient-block.module.css';
import { TIngredient } from '../../utils/types/ingredient-type';

type TIngredientBlock = {
    id: string;
    ingredients: Array<TIngredient>;
    name: string;
};
const IngredientBlock = memo(
    forwardRef<HTMLParagraphElement, TIngredientBlock>(
        (props, ref: ForwardedRef<HTMLParagraphElement>) => {
            return (
                <div className={`${styles.block}`}>
                    <p
                        id={props.id}
                        ref={ref}
                        className='text text_type_main-large mb-2'
                    >
                        {props.name}
                    </p>
                    <div
                        id={`${props.id}-container`}
                        className={`flex pt-6 pl-4 pr-2 ${styles.container}`}
                    >
                        {props.ingredients.map((ingredient) => (
                            <Card
                                key={ingredient._id}
                                ingredient={ingredient}
                            />
                        ))}
                    </div>
                </div>
            );
        }
    )
);

export default IngredientBlock;
