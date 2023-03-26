import { TIngredient } from '../ingredient-type';

export type TInitialIngredients = {
    fetchIngredientsRequest: boolean;
    fetchIngredientsFailed: boolean;
    ingredients: Array<TIngredient>;
};

export enum EnumIngredientsActionTypes {
    GET_INGREDIENTS = 'GET_INGREDIENTS',
    GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS',
    GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED',
}

export type GET_INGREDIENTS = {
    type: EnumIngredientsActionTypes.GET_INGREDIENTS;
};

export type GET_INGREDIENTS_SUCCESS = {
    type: EnumIngredientsActionTypes.GET_INGREDIENTS_SUCCESS;
    payload: Array<TIngredient>;
};

export type GET_INGREDIENTS_FAILED = {
    type: EnumIngredientsActionTypes.GET_INGREDIENTS_FAILED;
};

export type TIngredientsAction =
    | GET_INGREDIENTS_FAILED
    | GET_INGREDIENTS_SUCCESS
    | GET_INGREDIENTS;
