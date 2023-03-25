import { getIngredients } from '../../utils/api/ingredients-requests';
import {
    TIngredientsAction,
    EnumIngredientsActionTypes,
} from '../../utils/types/actions-types/ingredients-types';

import { Dispatch } from 'react';

export const fetchIngredientsAction = () => {
    return function (dispatch: Dispatch<TIngredientsAction>) {
        dispatch({
            type: EnumIngredientsActionTypes.GET_INGREDIENTS,
        });
        getIngredients()
            .then((res) => {
                dispatch({
                    type: EnumIngredientsActionTypes.GET_INGREDIENTS_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: EnumIngredientsActionTypes.GET_INGREDIENTS_FAILED,
                });
            });
    };
};
