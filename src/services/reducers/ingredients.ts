import {
    TInitialIngredients,
    EnumIngredientsActionTypes,
    TIngredientsAction,
} from '../../utils/types/actions-types/ingredients-types';

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
        case EnumIngredientsActionTypes.GET_INGREDIENTS: {
            return {
                ...state,
                fetchIngredientsRequest: true,
                fetchIngredientsFailed: false,
            };
        }
        case EnumIngredientsActionTypes.GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                fetchIngredientsRequest: false,
            };
        }
        case EnumIngredientsActionTypes.GET_INGREDIENTS_FAILED: {
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
