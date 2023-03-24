import { TIngredient } from './types/ingredient-type';

export const getPrice = (
    parts: Array<TIngredient>,
    bun: TIngredient
): number => {
    return (
        parts.reduce(
            (acc: number, current: TIngredient) => acc + current?.price,
            0
        ) +
            bun?.price * 2 || 0
    );
};
