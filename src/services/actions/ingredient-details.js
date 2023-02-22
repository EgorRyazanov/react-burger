import {
    ADD_DETAIL_INGREDIENT,
    REMOVE_DETAIL_INGREDIENT,
} from '../../utils/constants';

export const addDetailIngredientAction = (ingredient) => {
    return {
        type: ADD_DETAIL_INGREDIENT,
        payload: ingredient,
    };
};

export const removeDetailIngredientAction = {
    type: REMOVE_DETAIL_INGREDIENT,
};
