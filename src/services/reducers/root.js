import { combineReducers } from 'redux';

import constructorReducer from './constructor';
import fetchIngredientsReducer from './fetch-ingredients';
import ingredientDetailsReducer from './ingredient-details';
import orderDetailReducer from './order-details';

const rootReducer = combineReducers({
    constructorBurger: constructorReducer,
    fetchIngredients: fetchIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetail: orderDetailReducer,
});

export default rootReducer;
