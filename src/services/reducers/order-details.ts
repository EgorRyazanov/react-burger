import { TinitialOrder, TOderAction } from '../actions/order-details';
import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
} from '../constants/order-details';

const initialOrder: TinitialOrder = {
    fetchOrderRequest: false,
    fetchOrderFailed: false,
    order: null,
};

const orderDetailReducer = (state = initialOrder, action: TOderAction) => {
    switch (action.type) {
        case GET_ORDER: {
            return {
                ...state,
                fetchOrderRequest: true,
                fetchOrderFailed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.payload,
                fetchOrderRequest: false,
            };
        }
        case GET_ORDER_FAILED: {
            return {
                order: initialOrder.order,
                fetchOrderFailed: true,
                fetchOrderRequest: false,
            };
        }
        default:
            return state;
    }
};

export default orderDetailReducer;
