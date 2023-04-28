import { TWSState } from '../actions/websocket';
import { TWsActions } from '../actions/websocket';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSE,
} from '../constants/websocket';

export const initialState: TWSState = {
    wsConnected: false,
    ordersInformation: null,
};

export const wsReducer = (state = initialState, action: TWsActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true,
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
            };
        case WS_CONNECTION_CLOSE:
            return initialState;
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                ordersInformation: action.payload,
            };
        default:
            return state;
    }
};
