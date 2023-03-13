import { combineReducers } from 'redux';

import constructorReducer from './constructor';
import fetchIngredientsReducer from './ingredients';
import orderDetailReducer from './order-details';
import userReducer from './user';

const rootReducer = combineReducers({
    constructorBurger: constructorReducer,
    fetchIngredients: fetchIngredientsReducer,
    orderDetail: orderDetailReducer,
    user: userReducer,
});

export default rootReducer;
