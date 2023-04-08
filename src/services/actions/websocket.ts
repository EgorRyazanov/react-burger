import {
    WS_SEND_MESSAGE,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSE,
} from '../constants/websocket';

export type TOrderDetails = {
    _id: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

export type TOrderWS = {
    success: boolean;
    orders: Array<TOrderDetails>;
    total: number;
    totalToday: number;
};

export type TWSState = {
    wsConnected: boolean;
    ordersInformation: TOrderWS | null;

    error?: Event;
};

export interface WS_SEND_MESSAGE_ACTION {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: MessageEvent<any>;
}

export interface WS_GET_MESSAGE_ACTION {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TOrderWS;
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
    readonly payload: string;
}

export interface WS_CONNECTION_CLOSE_ACTION {
    readonly type: typeof WS_CONNECTION_CLOSE;
}

export type TWsActions =
    | WS_CONNECTION_START_ACTION
    | WS_CONNECTION_SUCCESS_ACTION
    | WS_CONNECTION_ERROR_ACTION
    | WS_CONNECTION_CLOSED_ACTION
    | WS_GET_MESSAGE_ACTION
    | WS_SEND_MESSAGE_ACTION
    | WS_CONNECTION_CLOSE_ACTION;
