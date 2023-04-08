import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
} from '../../services/constants/websocket';

export type TWSStoreActions = {
    wsInit: typeof WS_CONNECTION_START;
    wsClose: typeof WS_CONNECTION_CLOSE;
    wsSendMessage: typeof WS_SEND_MESSAGE;
    onOpen: typeof WS_CONNECTION_SUCCESS;
    onClose: typeof WS_CONNECTION_CLOSED;
    onError: typeof WS_CONNECTION_ERROR;
    onMessage: typeof WS_GET_MESSAGE;
};
