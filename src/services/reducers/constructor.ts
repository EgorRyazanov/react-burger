import {
    TInitialConstructor,
    TConstructorAction,
} from '../actions/constructor';
import {
    ADD_BUN,
    ADD_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    REMOVE_CONSTRUCTOR,
    UPDATE_BUN,
    UPDATE_CONSTRUCTOR,
} from '../constants/constructor';

export const initialConstructor: TInitialConstructor = {
    parts: [],
    bun: null,
};

const constructorReducer = (
    state = initialConstructor,
    action: TConstructorAction
) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR: {
            return {
                ...state,
                parts: [...state.parts, action.payload],
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case REMOVE_CONSTRUCTOR: {
            return {
                ...state,
                parts: state.parts.filter(
                    (element) => element.dragId !== action.payload
                ),
            };
        }
        case CLEAR_CONSTRUCTOR: {
            return initialConstructor;
        }
        case UPDATE_BUN: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case UPDATE_CONSTRUCTOR: {
            const { dragIndex, hoverIndex } = action.payload;
            const dragCard = state.parts[dragIndex];
            const currentCards = [...state.parts];
            currentCards.splice(dragIndex, 1);
            currentCards.splice(hoverIndex, 0, dragCard);
            return {
                ...state,
                parts: currentCards,
            };
        }

        default:
            return state;
    }
};

export default constructorReducer;
