import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
} from '../../constants/order-details';
import orderDetailReducer, { initialOrder } from '../order-details';
import { ORDER } from './constants';

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(orderDetailReducer(undefined, {})).toEqual(initialOrder);
    });
    it('should set loading when we are making request', () => {
        const state = orderDetailReducer(initialOrder, {
            type: GET_ORDER,
        });
        expect(state.fetchOrderRequest).toBe(true);
    });
    it('should set error when request is incorrect', () => {
        const state = orderDetailReducer(initialOrder, {
            type: GET_ORDER_FAILED,
        });
        expect(state.fetchOrderFailed).toBe(true);
    });
    it('should add ingredients to state', () => {
        const state = orderDetailReducer(initialOrder, {
            payload: ORDER,
            type: GET_ORDER_SUCCESS,
        });
        expect(state.order).toEqual(ORDER);
    });
});
