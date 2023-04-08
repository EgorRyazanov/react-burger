import {
    TInitialIngredients,
    TIngredientsAction,
} from '../actions/fetch-ingredients';
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
} from '../constants/fetch-ingredients';

const initialIngredientsState: TInitialIngredients = {
    fetchIngredientsRequest: false,
    fetchIngredientsFailed: false,
    ingredients: [],
};

const fetchIngredientsReducer = (
    state = initialIngredientsState,
    action: TIngredientsAction
) => {
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
                ingredients: action.payload,
                fetchIngredientsRequest: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ingredients: initialIngredientsState.ingredients,
                fetchIngredientsFailed: true,
                fetchIngredientsRequest: false,
            };
        }
        default:
            return state;
    }
};

export default fetchIngredientsReducer;
