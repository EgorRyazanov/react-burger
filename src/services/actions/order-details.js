import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
} from '../../utils/constants';

import { getOrder } from '../../utils/api/ingredients-requests';

export function makeOrderAction(id) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER,
        });
        getOrder(id)
            .then((res) => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: res,
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_ORDER_FAILED,
                });
            });
    };
}
