import fetchIngredientsReducer, {
    initialIngredientsState,
} from '../ingredients';
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
} from '../../constants/fetch-ingredients';
import { INGREDIENT } from './constants';

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(fetchIngredientsReducer(undefined, {})).toEqual(
            initialIngredientsState
        );
    });
    it('should set loading when we are making request', () => {
        const state = fetchIngredientsReducer(initialIngredientsState, {
            type: GET_INGREDIENTS,
        });
        expect(state.fetchIngredientsRequest).toBe(true);
    });
    it('should set error when request is incorrect', () => {
        const state = fetchIngredientsReducer(initialIngredientsState, {
            type: GET_INGREDIENTS_FAILED,
        });
        expect(state.fetchIngredientsFailed).toBe(true);
    });
    it('should add ingredients to state', () => {
        const state = fetchIngredientsReducer(initialIngredientsState, {
            payload: INGREDIENT,
            type: GET_INGREDIENTS_SUCCESS,
        });
        expect(state.ingredients).toEqual(INGREDIENT);
    });
});
