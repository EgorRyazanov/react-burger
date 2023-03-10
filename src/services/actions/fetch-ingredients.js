import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
} from '../../utils/constants';
import { getIngredients } from '../../utils/api/ingredients-requests';

export function fetchIngredientsAction() {
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
}
