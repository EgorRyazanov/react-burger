import { TConstructorElement } from '../services/actions/constructor';
import { TIngredient } from './types/ingredient-type';

export const getPrice = (
    parts: Array<TConstructorElement>,
    bun: TConstructorElement
): number => {
    return (
        parts.reduce(
            (acc: number, current: TIngredient) => acc + current?.price,
            0
        ) +
        bun.price * 2
    );
};
