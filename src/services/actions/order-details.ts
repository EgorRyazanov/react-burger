import getAccessToken from '../../utils/get-access-token';
import { fetchRefresh } from '../../utils/api/user-request';
import { ThunkAction } from 'redux-thunk';
import { getOrder } from '../../utils/api/ingredients-requests';
import { TRootState } from '../reducers/root';
import { TApplicationActions } from '../reducers/root';
import { TOrder } from '../../utils/types/order-type';
import {
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from '../constants/order-details';

export type TinitialOrder = {
    fetchOrderRequest: boolean;
    fetchOrderFailed: boolean;
    order: TOrder | null;
};

export interface GET_ORDER_ACTION {
    readonly type: typeof GET_ORDER;
}

export interface GET_ORDER_SUCCESS_ACTION {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: TOrder;
}

export interface GET_ORDER_FAILED_ACTION {
    readonly type: typeof GET_ORDER_FAILED;
}

export type TOderAction =
    | GET_ORDER_ACTION
    | GET_ORDER_SUCCESS_ACTION
    | GET_ORDER_FAILED_ACTION;

export function makeOrderAction(
    ingredients: string[]
): ThunkAction<void, TRootState, unknown, TApplicationActions> {
    return async function (dispatch) {
        dispatch({
            type: GET_ORDER,
        });
        try {
            getOrder(ingredients).then((res) => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
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
                        type: GET_ORDER_SUCCESS,
                        payload: res.order,
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
