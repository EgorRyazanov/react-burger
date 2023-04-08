import { TConstructorElement } from '../services/actions/constructor';
import { TIngredient } from './types/ingredient-type';

export const getPrice = (
    parts: Array<TConstructorElement | TIngredient>,
    bun: TConstructorElement | TIngredient
): number => {
    return (
        parts.reduce(
            (acc: number, current: TIngredient) => acc + current?.price,
            0
        ) +
        bun.price * 2
    );
};
