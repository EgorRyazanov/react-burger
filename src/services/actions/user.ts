import {
    fetchRegisterUser,
    fetchLogin,
    getUser,
    fetchRefresh,
    patchUser,
} from '../../utils/api/user-request';
import getAccessToken from '../../utils/get-access-token';
import {
    FETCH_USER_FAILED,
    FETCH_USER_SUCCESS,
    FETCH_USER_LOADING,
    RESET_ERROR_STATUS,
    UPDATE_USER,
    CLEAR_USER,
} from '../constants/user';
import { ThunkAction } from 'redux-thunk';
import { TApplicationActions, TRootState } from '../reducers/root';

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

export interface FETCH_USER_FAILED_ACTION {
    readonly type: typeof FETCH_USER_FAILED;
}

export type FETCH_USER_SUCCESS_ACTION = {
    readonly type: typeof FETCH_USER_SUCCESS;
    readonly payload: TUser;
};

export type FETCH_USER_LOADING_ACTION = {
    readonly type: typeof FETCH_USER_LOADING;
};

export type RESET_ERROR_STATUS_ACTION = {
    readonly type: typeof RESET_ERROR_STATUS;
};

export type UPDATE_USER_ACTION = {
    readonly type: typeof UPDATE_USER;
    readonly payload: TUser;
};

export type CLEAR_USER_ACTION = {
    readonly type: typeof CLEAR_USER;
};

export type TUserAction =
    | FETCH_USER_FAILED_ACTION
    | FETCH_USER_SUCCESS_ACTION
    | FETCH_USER_LOADING_ACTION
    | RESET_ERROR_STATUS_ACTION
    | UPDATE_USER_ACTION
    | CLEAR_USER_ACTION;

export function fetchRegisterUserAction(
    email: string,
    password: string,
    name: string
): ThunkAction<void, TRootState, unknown, TApplicationActions> {
    return function (dispatch) {
        dispatch({
            type: FETCH_USER_LOADING,
        });
        fetchRegisterUser(email, password, name)
            .then((res) => {
                const { user, accessToken, refreshToken } = res;
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem(
                    'accessToken',
                    getAccessToken(accessToken)
                );
                dispatch({
                    type: FETCH_USER_SUCCESS,
                    payload: user,
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_USER_FAILED,
                });
            });
    };
}

export function fetchLoginAction(
    email: string,
    password: string
): ThunkAction<void, TRootState, unknown, TApplicationActions> {
    return function (dispatch) {
        dispatch({
            type: FETCH_USER_LOADING,
        });

        fetchLogin(email, password)
            .then((res) => {
                const { user, accessToken, refreshToken } = res;
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem(
                    'accessToken',
                    getAccessToken(accessToken)
                );
                dispatch({
                    type: FETCH_USER_SUCCESS,
                    payload: user,
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_USER_FAILED,
                });
            });
    };
}

function fetchWithTokenAction(
    callback: (options?: any) => any,
    form: any = null
): ThunkAction<void, TRootState, unknown, TApplicationActions> {
    return async function (dispatch) {
        try {
            const res = await callback(form);
            const { user } = res;
            dispatch(updateUserAction(user));
        } catch {
            try {
                const refreshRes = await fetchRefresh();
                const { accessToken, refreshToken } = refreshRes;
                localStorage.setItem(
                    'accessToken',
                    getAccessToken(accessToken)
                );
                localStorage.setItem('refreshToken', refreshToken);
                const resUser = await callback();
                const { user } = resUser;
                dispatch(updateUserAction(user));
            } catch {
                localStorage.clear();
                dispatch(clearUserAction);
            }
        }
    };
}

export const loginWithTokenAction = () => fetchWithTokenAction(getUser);
export const patchWithTokenAction = (form: any) =>
    fetchWithTokenAction(patchUser, form);

export const resetErrorStatusAction: TUserAction = {
    type: RESET_ERROR_STATUS,
};

export const updateUserAction = (user: TUser): TUserAction => {
    return {
        type: UPDATE_USER,
        payload: user,
    };
};

export const clearUserAction: TUserAction = {
    type: CLEAR_USER,
};
