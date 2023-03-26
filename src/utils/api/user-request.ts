import {
    TResponseForgotPassword,
    TResponseLogin,
    TResponseLogout,
    TResponseUser,
    TResponseRefresh,
    TResponseRegister,
    TResponseResetPassword,
} from '../types/api';
import request from './index';

export const fetchRecoverPassword = (
    email: string
): Promise<TResponseForgotPassword> =>
    request('password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        }),
    });

export const fetchRegisterUser = (
    email: string,
    password: string,
    name: string
): Promise<TResponseRegister> =>
    request('auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        }),
    });

export const fetchResetPassword = (
    password: string,
    token: string
): Promise<TResponseResetPassword> =>
    request('password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
            token: token,
        }),
    });

export const fetchLogin = (
    email: string,
    password: string
): Promise<TResponseLogin> =>
    request('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

export const fetchRefresh = (): Promise<TResponseRefresh> =>
    request('auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });

export const fetchLogout = (): Promise<TResponseLogout> =>
    request('auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });

export const patchUser = (form: {
    name?: string;
    password?: string;
    email?: string;
}): Promise<TResponseUser> => {
    return request('auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(form),
    });
};

export const getUser = (): Promise<TResponseUser> =>
    request('auth/user', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
    });
