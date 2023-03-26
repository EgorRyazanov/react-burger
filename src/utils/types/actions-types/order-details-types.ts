import { TOrder } from '../order-type';

export type TinitialOrder = {
    fetchOrderRequest: boolean;
    fetchOrderFailed: boolean;
    order: TOrder | null;
};

export enum EnumOrderActionTypes {
    GET_ORDER = 'GET_ORDER',
    GET_ORDER_FAILED = 'GET_ORDER_FAILED',
    GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
}

export type GET_ORDER = {
    type: EnumOrderActionTypes.GET_ORDER;
};

export type GET_ORDER_SUCCESS = {
    type: EnumOrderActionTypes.GET_ORDER_SUCCESS;
    payload: TOrder;
};

export type GET_ORDER_FAILED = {
    type: EnumOrderActionTypes.GET_ORDER_FAILED;
};

export type TOderAction = GET_ORDER | GET_ORDER_SUCCESS | GET_ORDER_FAILED;
