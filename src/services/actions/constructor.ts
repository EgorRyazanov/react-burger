import { TIngredient } from '../../utils/types/ingredient-type';
import uuid from 'react-uuid';
import {
    ADD_BUN,
    ADD_CONSTRUCTOR,
    UPDATE_BUN,
    REMOVE_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    UPDATE_CONSTRUCTOR,
} from '../constants/constructor';

export type TConstructorElement = TIngredient & {
    dragId: string;
    index?: number;
};

export type TInitialConstructor = {
    parts: Array<TConstructorElement>;
    bun: TConstructorElement | null;
};

export type ADD_BUN_ACTION = {
    readonly type: typeof ADD_BUN;
    readonly payload: TConstructorElement;
};

export interface ADD_CONSTRUCTOR_ACTION {
    readonly type: typeof ADD_CONSTRUCTOR;
    readonly payload: TConstructorElement;
}

export interface REMOVE_CONSTRUCTOR_ACTION {
    readonly type: typeof REMOVE_CONSTRUCTOR;
    readonly payload: string;
}

export interface CLEAR_CONSTRUCTOR_ACTION {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface UPDATE_BUN_ACTION {
    readonly type: typeof UPDATE_BUN;
    readonly payload: TConstructorElement;
}

export interface UPDATE_CONSTRUCTOR_ACTION {
    readonly type: typeof UPDATE_CONSTRUCTOR;
    readonly payload: { dragIndex: number; hoverIndex: number };
}

export type TConstructorAction =
    | UPDATE_CONSTRUCTOR_ACTION
    | ADD_BUN_ACTION
    | ADD_CONSTRUCTOR_ACTION
    | REMOVE_CONSTRUCTOR_ACTION
    | CLEAR_CONSTRUCTOR_ACTION
    | UPDATE_BUN_ACTION;

export const addElementToConstructorAction = (
    ingredient: TIngredient
): ADD_CONSTRUCTOR_ACTION => {
    return {
        type: ADD_CONSTRUCTOR,
        payload: {
            ...ingredient,
            dragId: uuid(),
        },
    };
};

export const addBunToConstructorAction = (
    ingredient: TIngredient
): ADD_BUN_ACTION => {
    return {
        type: ADD_BUN,
        payload: {
            ...ingredient,
            dragId: uuid(),
        },
    };
};

export const removeElementFromConstructorAction = (
    id: string
): REMOVE_CONSTRUCTOR_ACTION => {
    return {
        type: REMOVE_CONSTRUCTOR,
        payload: id,
    };
};

export const clearConstructorAction: TConstructorAction = {
    type: CLEAR_CONSTRUCTOR,
};

export const updateBunInConstructorAction = (
    ingredient: TIngredient
): UPDATE_BUN_ACTION => {
    return {
        type: UPDATE_BUN,
        payload: {
            ...ingredient,
            dragId: uuid(),
        },
    };
};

export const updateComponentsConstructorAction = (
    hoverIndex: number,
    dragIndex: number
): UPDATE_CONSTRUCTOR_ACTION => {
    return {
        type: UPDATE_CONSTRUCTOR,
        payload: { hoverIndex: hoverIndex, dragIndex: dragIndex },
    };
};
