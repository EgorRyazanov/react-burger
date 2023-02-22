import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
} from '../../utils/constants';

const initialOrder = {
    fetchOrderRequest: false,
    fetchOrderFailed: false,
    order: null,
};

const orderDetailReducer = (state = initialOrder, action) => {
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
                order: action.data,
                fetchOrderRequest: false,
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                fetchOrderFailed: true,
                fetchOrderRequest: false,
            };
        }
        default:
            return state;
    }
};

export default orderDetailReducer;
