import { getIngredients } from '../../utils/api/ingredients-requests';
import { TIngredient } from '../../utils/types/ingredient-type';
import { ThunkAction } from 'redux-thunk';
import { TApplicationActions, TRootState } from '../reducers/root';
import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
} from '../constants/fetch-ingredients';

export type TInitialIngredients = {
    fetchIngredientsRequest: boolean;
    fetchIngredientsFailed: boolean;
    ingredients: Array<TIngredient>;
};

export interface GET_INGREDIENTS_ACTION {
    readonly type: typeof GET_INGREDIENTS;
}

export interface GET_INGREDIENTS_SUCCESS_ACTION {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: Array<TIngredient>;
}

export interface GET_INGREDIENTS_FAILED_ACTION {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsAction =
    | GET_INGREDIENTS_FAILED_ACTION
    | GET_INGREDIENTS_SUCCESS_ACTION
    | GET_INGREDIENTS_ACTION;

export const fetchIngredientsAction = (): ThunkAction<
    void,
    TRootState,
    unknown,
    TApplicationActions
> => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS,
        });
        getIngredients()
            .then((res) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            });
    };
};
