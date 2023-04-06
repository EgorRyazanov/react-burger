import {
    WS_SEND_MESSAGE,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_START,
} from '../constants/websocket';

export type TWSState = {
    wsConnected: boolean;
    orders_information: any[];

    error?: Event;
};

export interface WS_SEND_MESSAGE_ACTION {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: MessageEvent<any>;
}

export interface WS_GET_MESSAGE_ACTION {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}

export interface WS_CONNECTION_CLOSED_ACTION {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: Event;
}

export interface WS_CONNECTION_ERROR_ACTION {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface WS_CONNECTION_SUCCESS_ACTION {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: Event;
}

export interface WS_CONNECTION_START_ACTION {
    readonly type: typeof WS_CONNECTION_START;
}

export type TWsActions =
    | WS_CONNECTION_START_ACTION
    | WS_CONNECTION_SUCCESS_ACTION
    | WS_CONNECTION_ERROR_ACTION
    | WS_CONNECTION_CLOSED_ACTION
    | WS_GET_MESSAGE_ACTION
    | WS_SEND_MESSAGE_ACTION;
