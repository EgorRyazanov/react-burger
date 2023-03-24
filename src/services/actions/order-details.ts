import getAccessToken from '../../utils/get-access-token';
import { fetchRefresh } from '../../utils/api/user-request';

import { getOrder } from '../../utils/api/ingredients-requests';
import { Dispatch } from 'redux';
import {
    EnumOrderActionTypes,
    TOderAction,
} from '../../utils/types/actions-types/order-details-types';

export function makeOrderAction(ingredients: string[]) {
    return async function (dispatch: Dispatch<TOderAction>) {
        dispatch({
            type: EnumOrderActionTypes.GET_ORDER,
        });
        try {
            getOrder(ingredients).then((res) => {
                dispatch({
                    type: EnumOrderActionTypes.GET_ORDER_SUCCESS,
                    payload: res.order,
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
                getOrder(ingredients).then((res) => {
                    dispatch({
                        type: EnumOrderActionTypes.GET_ORDER_SUCCESS,
                        payload: res.order,
                    });
                });
            } catch {
                dispatch({
                    type: EnumOrderActionTypes.GET_ORDER_FAILED,
                });
            }
        }
    };
}
