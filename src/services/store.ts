import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers/root';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware';

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunk,
            socketMiddleware('wss://norma.nomoreparties.space/orders/all')
        )
    )
);

export type TRootDispatch = typeof store.dispatch;
