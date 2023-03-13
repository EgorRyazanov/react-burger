import {
    ADD_DETAIL_INGREDIENT,
    REMOVE_DETAIL_INGREDIENT,
} from '../../utils/constants';

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
            return initialDedailData;
        }
        default:
            return state;
    }
};

export default ingredientDetailsReducer;
