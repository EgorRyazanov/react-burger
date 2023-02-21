import { combineReducers } from 'redux';

import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    ADD_DETAIL_INGREDIENT,
    REMOVE_DETAIL_INGREDIENT,
    ADD_CONSTRUCTOR,
    ADD_BUN,
    UPDATE_BUN,
    REMOVE_CONSTRUCTOR,
    REMOVE_BUN,
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
} from '../utils/constants';

const initialIngredientsState = {
    fetchIngredientsRequest: false,
    fetchIngredientsFailed: false,
    ingredients: [],
};

const fetchIngredientsReducer = (state = initialIngredientsState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                fetchIngredientsRequest: true,
                fetchIngredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.data,
                fetchIngredientsRequest: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                fetchIngredientsFailed: true,
                fetchIngredientsRequest: false,
            };
        }
        default:
            return state;
    }
};

const initialConstructor = {
    parts: [],
    bun: null,
};

const constructorReducer = (state = initialConstructor, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR: {
            return {
                ...state,
                parts: [...state.parts, action.payload],
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case REMOVE_CONSTRUCTOR: {
            return {
                ...state,
                parts: state.parts.filter(
                    (element) => element.dragId !== action.payload
                ),
            };
        }
        case REMOVE_BUN: {
            return initialConstructor;
        }
        case UPDATE_BUN: {
            return {
                ...state,
                bun: action.payload,
            };
        }

        default:
            return state;
    }
};

const initialDedailData = {
    ingredient: null,
};

const ingredientDetailsReducer = (state = initialDedailData, action) => {
    switch (action.type) {
        case ADD_DETAIL_INGREDIENT: {
            return {
                ...state,
                ingredient: { ...action.payload },
            };
        }
        case REMOVE_DETAIL_INGREDIENT: {
            return {
                ...state,
                ingredient: initialDedailData.ingredient,
            };
        }
        default:
            return state;
    }
};

const initialOrder = {
    fetchOrderRequest: false,
    fetchOrderFailed: false,
    order: null,
};

const orderDetailReducer = (state = initialOrder, action) => {
    switch (action.type) {
        case GET_ORDER: {
            return {
                ...state,
                fetchOrderRequest: true,
                fetchOrderFailed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.data,
                fetchOrderRequest: false,
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                fetchOrderFailed: true,
                fetchOrderRequest: false,
            };
        }
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    constructorBurger: constructorReducer,
    fetchIngredients: fetchIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetail: orderDetailReducer,
});
