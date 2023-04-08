import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers/root';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware';
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
} from './constants/websocket';
import { TWSStoreActions } from '../utils/types/store';

const wsActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
};

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)))
);

export type TRootDispatch = typeof store.dispatch;
