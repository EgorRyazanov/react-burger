import { TIngredient } from '../../utils/types/ingredient-type';
import {
    EnumConstructorActionTypes,
    TConstructorAction,
} from '../../utils/types/actions-types/constructor-types';
import uuid from 'react-uuid';

export const addElementToConstructorAction = (
    ingredient: TIngredient
): TConstructorAction => {
    return {
        type: EnumConstructorActionTypes.ADD_CONSTRUCTOR,
        payload: {
            ...ingredient,
            dragId: uuid(),
        },
    };
};

export const addBunToConstructorAction = (
    ingredient: TIngredient
): TConstructorAction => {
    return {
        type: EnumConstructorActionTypes.ADD_BUN,
        payload: {
            ...ingredient,
            dragId: uuid(),
        },
    };
};

export const removeElementFromConstructorAction = (
    id: string
): TConstructorAction => {
    return {
        type: EnumConstructorActionTypes.REMOVE_CONSTRUCTOR,
        payload: id,
    };
};

export const clearConstructorAction: TConstructorAction = {
    type: EnumConstructorActionTypes.CLEAR_CONSTRUCTOR,
};

export const updateBunInConstructorAction = (
    ingredient: TIngredient
): TConstructorAction => {
    return {
        type: EnumConstructorActionTypes.UPDATE_BUN,
        payload: {
            ...ingredient,
            dragId: uuid(),
        },
    };
};

export const updateComponentsConstructorAction = (
    hoverIndex: number,
    dragIndex: number
): TConstructorAction => {
    return {
        type: EnumConstructorActionTypes.UPDATE_CONSTRUCTOR,
        payload: { hoverIndex: hoverIndex, dragIndex: dragIndex },
    };
};
