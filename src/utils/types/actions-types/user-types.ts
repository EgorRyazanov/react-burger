export type TUser = {
    name: string;
    email: string;
};

export type TInitialState = {
    user: TUser | null;
    status: {
        isLoading: boolean;
        fetchUserFailed: boolean;
    };
};

export enum EnumUserActionsTypes {
    FETCH_USER_FAILED = 'FETCH_USER_FAILED',
    FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
    FETCH_USER_LOADING = 'FETCH_USER_LOADING',
    RESET_ERROR_STATUS = 'RESET_ERROR_STATUS',
    UPDATE_USER = 'UPDATE_USER',
    CLEAR_USER = 'CLEAR_USER',
}

export type FETCH_USER_FAILED = {
    type: EnumUserActionsTypes.FETCH_USER_FAILED;
};

export type FETCH_USER_SUCCESS = {
    type: EnumUserActionsTypes.FETCH_USER_SUCCESS;
    payload: TUser;
};

export type FETCH_USER_LOADING = {
    type: EnumUserActionsTypes.FETCH_USER_LOADING;
};

export type RESET_ERROR_STATUS = {
    type: EnumUserActionsTypes.RESET_ERROR_STATUS;
};

export type UPDATE_USER = {
    type: EnumUserActionsTypes.UPDATE_USER;
    payload: TUser;
};

export type CLEAR_USER = {
    type: EnumUserActionsTypes.CLEAR_USER;
};

export type TUserAction =
    | FETCH_USER_FAILED
    | FETCH_USER_SUCCESS
    | FETCH_USER_LOADING
    | RESET_ERROR_STATUS
    | UPDATE_USER
    | CLEAR_USER;
