import {
    ADD_CONSTRUCTOR,
    ADD_BUN,
    UPDATE_BUN,
    REMOVE_CONSTRUCTOR,
    REMOVE_BUN,
    UPDATE_CONSTRUCTOR,
} from '../../utils/constants';

import { v4 as uuid } from 'uuid';

export const addElementToConstructorAction = (ingredient) => {
    return {
        type: ADD_CONSTRUCTOR,
        payload: {
            ...ingredient,
            dragId: uuid(),
        },
    };
};

export const addBunToConstructorAction = (ingredient) => {
    return {
        type: ADD_BUN,
        payload: {
            ...ingredient,
            dragId: uuid(),
        },
    };
};

export const removeElementFromConstructorAction = (id) => {
    return {
        type: REMOVE_CONSTRUCTOR,
        payload: id,
    };
};

export const removeBunFromConstructorAction = {
    type: REMOVE_BUN,
};

export const updateBunInConstructorAction = (ingredient) => {
    return {
        type: UPDATE_BUN,
        payload: ingredient,
    };
};

export const updateComponentsConstructorAction = (hoverIndex, dragIndex) => {
    return {
        type: UPDATE_CONSTRUCTOR,
        payload: { hoverIndex: hoverIndex, dragIndex: dragIndex },
    };
};
