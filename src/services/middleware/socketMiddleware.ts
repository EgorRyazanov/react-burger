import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { TRootDispatch } from '../store';
import { TRootState } from '../reducers/root';
import { TWSStoreActions } from '../../utils/types/store';

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<TRootDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: AnyAction) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const {
                wsInit,
                wsClose,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
            } = wsActions;
            if (type === wsInit) {
                socket = new WebSocket(payload);
            }
            if (type === wsClose) {
                socket?.close();
            }
            if (socket) {
                socket.onopen = (event) => {
                    dispatch({ type: onOpen, payload: event });
                };
                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };
                socket.onmessage = async (event) => {
                    const message = JSON.parse(event.data);
                    dispatch({ type: onMessage, payload: message });
                };
                socket.onclose = (event) => {
                    dispatch({ type: onClose, payload: event });
                };
                if (type === wsSendMessage) {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};
