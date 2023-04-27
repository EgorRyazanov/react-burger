import uuid from 'react-uuid';
import constructorReducer, { initialConstructor } from '../constructor';
import { INGREDIENT, CONSTRUCTOR_BUN } from './constants';
import {
    ADD_BUN,
    ADD_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    REMOVE_CONSTRUCTOR,
    UPDATE_BUN,
    UPDATE_CONSTRUCTOR,
} from '../../constants/constructor';

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialConstructor);
    });
    it('should add ingredient to state', () => {
        const ingredient = { ...INGREDIENT, dragId: uuid() };
        const state = constructorReducer(initialConstructor, {
            type: ADD_CONSTRUCTOR,
            payload: ingredient,
        });
        expect(state.parts).toEqual([ingredient]);
    });
    it('should add bun to state', () => {
        const bun = { ...CONSTRUCTOR_BUN, dragId: uuid() };
        const state = constructorReducer(initialConstructor, {
            type: ADD_BUN,
            payload: bun,
        });
        expect(state.bun).toEqual(bun);
    });
    it('should remove ingredient from state', () => {
        const dragId = uuid();
        const firstIngredient = { ...INGREDIENT, dragId };
        const secondIngredient = { ...INGREDIENT, dragId: uuid() };
        const currentState = {
            ...initialConstructor,
            parts: [firstIngredient, secondIngredient],
        };

        const state = constructorReducer(currentState, {
            type: REMOVE_CONSTRUCTOR,
            payload: dragId,
        });
        expect(state.parts).toEqual([secondIngredient]);
    });
    it('should clear constructor state', () => {
        const currentState = {
            ...initialConstructor,
            parts: [{ ...INGREDIENT, dragId: uuid() }],
        };

        const state = constructorReducer(currentState, {
            type: CLEAR_CONSTRUCTOR,
        });
        expect(state).toEqual(initialConstructor);
    });
    it('should update bun in state', () => {
        const newBun = { ...CONSTRUCTOR_BUN, dragId: uuid(), name: 'new bun' };
        const currentState = {
            ...initialConstructor,
            bun: { ...CONSTRUCTOR_BUN, dragId: uuid() },
        };

        const state = constructorReducer(currentState, {
            type: UPDATE_BUN,
            payload: newBun,
        });
        expect(state.bun).toEqual(newBun);
    });
    it('should change orders of ingredients', () => {
        const firstIngredient = { ...INGREDIENT, dragId: uuid() };
        const secondIngredient = { ...INGREDIENT, dragId: uuid() };
        const currentState = {
            ...initialConstructor,
            parts: [firstIngredient, secondIngredient],
        };

        const state = constructorReducer(currentState, {
            type: UPDATE_CONSTRUCTOR,
            payload: { dragIndex: 0, hoverIndex: 1 },
        });
        expect(state.parts).toEqual([secondIngredient, firstIngredient]);
    });
});
