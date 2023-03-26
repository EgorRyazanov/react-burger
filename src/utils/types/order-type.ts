import { TIngredient } from './ingredient-type';

export type TOrder = {
    createdAt: string;
    ingredients: Array<TIngredient>;
    name: string;
    number: number;
    owner: {
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    };
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
};
