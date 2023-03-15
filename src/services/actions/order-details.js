import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
} from '../../utils/constants';
import getAccessToken from '../../utils/get-access-token';
import { fetchRefresh } from '../../utils/api/user-request';

import { getOrder } from '../../utils/api/ingredients-requests';

export function makeOrderAction(id) {
    return async function (dispatch) {
        dispatch({
            type: GET_ORDER,
        });
        try {
            getOrder(id).then((res) => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: res,
                });
            });
        } catch {
            try {
                const refreshRes = await fetchRefresh();
                const { accessToken, refreshToken } = refreshRes;
                localStorage.setItem(
                    'accessToken',
                    getAccessToken(accessToken)
                );
                localStorage.setItem('refreshToken', refreshToken);
                getOrder(id).then((res) => {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        payload: res,
                    });
                });
            } catch {
                dispatch({
                    type: GET_ORDER_FAILED,
                });
            }
        }
    };
}
