import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { TRootDispatch } from '../store';
import { TRootState } from '../reducers/root';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<TRootDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: AnyAction) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START') {
                socket = new WebSocket(wsUrl);
            }
            if (socket) {
                socket.onopen = (event) => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                };
                socket.onerror = (event) => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                };
                socket.onmessage = async (event) => {
                    const message = JSON.parse(event.data);
                    dispatch({ type: 'WS_GET_MESSAGE', payload: message });
                };
                socket.onclose = (event) => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                };
                if (type === 'WS_SEND_MESSAGE') {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};
