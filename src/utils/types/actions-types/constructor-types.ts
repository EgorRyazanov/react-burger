import { TIngredient } from '../ingredient-type';

type TConstructorElement = TIngredient & { dragId: string };

export type TInitialConstructor = {
    parts: Array<TConstructorElement>;
    bun: TConstructorElement | null;
};

export enum EnumConstructorActionTypes {
    ADD_CONSTRUCTOR = 'ADD_CONSTRUCTOR',
    ADD_BUN = 'ADD_BUN',
    UPDATE_BUN = 'UPDATE_BUN',
    REMOVE_CONSTRUCTOR = 'REMOVE_CONSTRUCTOR',
    CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR',
    UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR',
}

export type ADD_BUN = {
    type: EnumConstructorActionTypes.ADD_BUN;
    payload: TConstructorElement;
};

export type ADD_CONSTRUCTOR = {
    type: EnumConstructorActionTypes.ADD_CONSTRUCTOR;
    payload: TConstructorElement;
};

export type REMOVE_CONSTRUCTOR = {
    type: EnumConstructorActionTypes.REMOVE_CONSTRUCTOR;
    payload: string;
};

export type CLEAR_CONSTRUCTOR = {
    type: EnumConstructorActionTypes.CLEAR_CONSTRUCTOR;
};

export type UPDATE_BUN = {
    type: EnumConstructorActionTypes.UPDATE_BUN;
    payload: TConstructorElement;
};

export type UPDATE_CONSTRUCTOR = {
    type: EnumConstructorActionTypes.UPDATE_CONSTRUCTOR;
    payload: { dragIndex: number; hoverIndex: number };
};

export type TConstructorAction =
    | UPDATE_CONSTRUCTOR
    | ADD_BUN
    | ADD_CONSTRUCTOR
    | REMOVE_CONSTRUCTOR
    | CLEAR_CONSTRUCTOR
    | UPDATE_BUN;
