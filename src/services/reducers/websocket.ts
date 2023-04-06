import { TWSState } from '../actions/websocket';
import { TWsActions } from '../actions/websocket';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
} from '../constants/websocket';

const initialState: TWSState = {
    wsConnected: false,
    orders_information: [],
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
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                orders_information: action.payload,
            };
        default:
            return state;
    }
};
