import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    ADD_DETAIL_INGREDIENT,
    REMOVE_DETAIL_INGREDIENT,
} from '../utils/constants';
import { getIngredients } from '../utils/api';

export function getFetchIngredientsAction() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS,
        });
        getIngredients()
            .then((res) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    data: res.data,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            });
    };
}

export const addDetailIngredientAction = (ingredient) => {
    return {
        type: ADD_DETAIL_INGREDIENT,
        payload: ingredient,
    };
};

export const removeDetailIngredientAction = {
    type: REMOVE_DETAIL_INGREDIENT,
};
