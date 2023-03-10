import {
    FETCH_USER_FAILED,
    FETCH_USER_SUCCESS,
    FETCH_USER_LOADING,
    RESET_ERROR_STATUS,
    UPDATE_USER,
    CLEAR_USER,
} from '../../utils/constants';
import { fetchRegisterUser, fetchLogin } from '../../utils/api/user-request';

import getAccessToken from '../../utils/get-access-token';

export function fetchRegisterUserAction(email, password, name) {
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

export function fetchLoginAction(email, password) {
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

export const resetErrorStatusAction = {
    type: RESET_ERROR_STATUS,
};

export const updateUserAction = (user) => {
    return {
        type: UPDATE_USER,
        payload: user,
    };
};

export const clearUserAction = {
    type: CLEAR_USER,
};
