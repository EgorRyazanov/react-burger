import {
    TinitialOrder,
    EnumOrderActionTypes,
    TOderAction,
} from '../../utils/types/actions-types/order-details-types';

const initialOrder: TinitialOrder = {
    fetchOrderRequest: false,
    fetchOrderFailed: false,
    order: null,
};

const orderDetailReducer = (state = initialOrder, action: TOderAction) => {
    switch (action.type) {
        case EnumOrderActionTypes.GET_ORDER: {
            return {
                ...state,
                fetchOrderRequest: true,
                fetchOrderFailed: false,
            };
        }
        case EnumOrderActionTypes.GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.payload,
                fetchOrderRequest: false,
            };
        }
        case EnumOrderActionTypes.GET_ORDER_FAILED: {
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
