import {
    TInitialConstructor,
    EnumConstructorActionTypes,
    TConstructorAction,
} from '../../utils/types/actions-types/constructor-types';

const initialConstructor: TInitialConstructor = {
    parts: [],
    bun: null,
};

const constructorReducer = (
    state = initialConstructor,
    action: TConstructorAction
) => {
    switch (action.type) {
        case EnumConstructorActionTypes.ADD_CONSTRUCTOR: {
            return {
                ...state,
                parts: [...state.parts, action.payload],
            };
        }
        case EnumConstructorActionTypes.ADD_BUN: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case EnumConstructorActionTypes.REMOVE_CONSTRUCTOR: {
            return {
                ...state,
                parts: state.parts.filter(
                    (element) => element.dragId !== action.payload
                ),
            };
        }
        case EnumConstructorActionTypes.CLEAR_CONSTRUCTOR: {
            return initialConstructor;
        }
        case EnumConstructorActionTypes.UPDATE_BUN: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case EnumConstructorActionTypes.UPDATE_CONSTRUCTOR: {
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
