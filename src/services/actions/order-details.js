import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
} from '../../utils/constants';

import { getOrder } from '../../utils/api';

export function makeOrderAction(id) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER,
        });
        getOrder(id)
            .then((res) => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    data: res,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: GET_ORDER_FAILED,
                });
            });
    };
}
