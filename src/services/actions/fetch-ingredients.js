import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
} from '../../utils/constants';
import { getIngredients } from '../../utils/api';

export function fetchIngredientsAction() {
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
