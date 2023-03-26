import {
    fetchRegisterUser,
    fetchLogin,
    getUser,
    fetchRefresh,
    patchUser,
} from '../../utils/api/user-request';

import getAccessToken from '../../utils/get-access-token';
import { Dispatch } from 'react';
import {
    EnumUserActionsTypes,
    TUser,
    TUserAction,
} from '../../utils/types/actions-types/user-types';

export function fetchRegisterUserAction(
    email: string,
    password: string,
    name: string
) {
    return function (dispatch: Dispatch<TUserAction>) {
        dispatch({
            type: EnumUserActionsTypes.FETCH_USER_LOADING,
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
                    type: EnumUserActionsTypes.FETCH_USER_SUCCESS,
                    payload: user,
                });
            })
            .catch((error) => {
                dispatch({
                    type: EnumUserActionsTypes.FETCH_USER_FAILED,
                });
            });
    };
}

export function fetchLoginAction(email: string, password: string) {
    return function (dispatch: Dispatch<TUserAction>) {
        dispatch({
            type: EnumUserActionsTypes.FETCH_USER_LOADING,
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
                    type: EnumUserActionsTypes.FETCH_USER_SUCCESS,
                    payload: user,
                });
            })
            .catch((error) => {
                dispatch({
                    type: EnumUserActionsTypes.FETCH_USER_FAILED,
                });
            });
    };
}

function fetchWithTokenAction(
    callback: (options?: any) => any,
    form: any = null
) {
    return async function (dispatch: Dispatch<TUserAction>) {
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
    type: EnumUserActionsTypes.RESET_ERROR_STATUS,
};

export const updateUserAction = (user: TUser): TUserAction => {
    return {
        type: EnumUserActionsTypes.UPDATE_USER,
        payload: user,
    };
};

export const clearUserAction: TUserAction = {
    type: EnumUserActionsTypes.CLEAR_USER,
};
