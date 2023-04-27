import { wsReducer, initialState } from '../websocket';
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
} from '../../constants/websocket';
import { ORDER_DETAILS } from './constants';

describe('websocket reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState);
    });
    it('should update connection state', () => {
        const state = wsReducer(initialState, { type: WS_CONNECTION_SUCCESS });
        expect(state.wsConnected).toBe(true);
    });
    it('should set error when connection is incorrect', () => {
        const error = new Error('ошибка в соединении');
        const state = wsReducer(initialState, {
            type: WS_CONNECTION_ERROR,
            payload: error,
        });
        expect(state.error).toEqual(error);
    });
    it('should clear ws information', () => {
        const ordersInformation = {
            success: true,
            orders: [ORDER_DETAILS],
            total: 1,
            totalToday: 1,
        };
        const currentState = {
            ...initialState,
            wsConnected: true,
            ordersInformation,
        };
        expect(wsReducer(currentState, { type: WS_CONNECTION_CLOSE })).toEqual(
            initialState
        );
    });
    it('should close socket connection', () => {
        const currentState = {
            ...initialState,
            wsConnected: true,
        };
        expect(wsReducer(currentState, { type: WS_CONNECTION_CLOSED })).toEqual(
            initialState
        );
    });
    it('should record messages from socket connection', () => {
        const ordersInformation = {
            success: true,
            orders: [ORDER_DETAILS],
            total: 1,
            totalToday: 1,
        };
        const currentState = {
            ...initialState,
            wsConnected: true,
        };
        const state = wsReducer(currentState, {
            type: WS_GET_MESSAGE,
            payload: ordersInformation,
        });
        expect(state.ordersInformation).toEqual(ordersInformation);
    });
});
