import { combineReducers } from 'redux';

import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    ADD_DETAIL_INGREDIENT,
    REMOVE_DETAIL_INGREDIENT,
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
};

const constructorReducer = (state = initialConstructor, action) => {
    switch (action.type) {
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

// const initialOrder = {
//     fetchIngredientsRequest: false,
//     fetchIngredientsFailed: false,
//     ingredients: [],
// };

// const orderDetailReducer = (state = initialOrder, action) => {
//     switch (action.type) {
//         case GET_ORDER: {
//             return {
//                 ...state,
//                 fetchIngredientsRequest: true,
//                 fetchIngredientsFailed: false,
//             };
//         }
//         case GET_ORDER_SUCCESS: {
//             return {
//                 ...state,
//                 ingredients: action.data,
//                 fetchIngredientsRequest: false,
//             };
//         }
//         case GET_ORDER_FAILED: {
//             return {
//                 ...state,
//                 fetchIngredientsFailed: true,
//                 fetchIngredientsRequest: false,
//             };
//         }
//         default:
//             return state;
//     }
// };

export const rootReducer = combineReducers({
    constructorBurger: constructorReducer,
    fetchIngredients: fetchIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    // orderDetail: orderDetailReducer,
});
