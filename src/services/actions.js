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
    UPDATE_CONSTRUCTOR
} from '../utils/constants';
import { getIngredients, getOrder } from '../utils/api';
import { v4 as uuid } from 'uuid';

export function getFetchIngredientsAction() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS,
        });
        getIngredients()
            .then((res) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    data: res.data,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            });
    };
}

export function getFetchOrderAction(id) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER,
        });
        getOrder(id)
            .then((res) => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    data: res,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: GET_ORDER_FAILED,
                });
            });
    };
}

export const addDetailIngredientAction = (ingredient) => {
    return {
        type: ADD_DETAIL_INGREDIENT,
        payload: ingredient,
    };
};

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

export const updateComponentsConstructorAction = (ingredients) => {
    return {
        type: UPDATE_CONSTRUCTOR,
        payload: ingredients,
    };
}

export const removeDetailIngredientAction = {
    type: REMOVE_DETAIL_INGREDIENT,
};
