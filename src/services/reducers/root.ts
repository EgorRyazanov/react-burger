import { combineReducers } from 'redux';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import constructorReducer from './constructor';
import fetchIngredientsReducer from './ingredients';
import orderDetailReducer from './order-details';
import userReducer from './user';
import { TUserAction } from '../actions/user';
import { TIngredientsAction } from '../actions/fetch-ingredients';
import { TConstructorAction } from '../actions/constructor';
import { TOderAction } from '../actions/order-details';

const rootReducer = combineReducers({
    constructorBurger: constructorReducer,
    fetchIngredients: fetchIngredientsReducer,
    orderDetail: orderDetailReducer,
    user: userReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TApplicationActions =
    | TConstructorAction
    | TIngredientsAction
    | TOderAction
    | TUserAction;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;
export default rootReducer;
