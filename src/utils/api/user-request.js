import request from './index';

export const fetchRecoverPassword = (email) =>
    request('password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        }),
    });

export const fetchRegisterUser = (email, password, name) =>
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

export const fetchResetPassword = (password, token) =>
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

export const fetchLogin = (email, password) =>
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

export const fetchRefresh = () =>
    request('auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });

export const fetchLogout = () =>
    request('auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });

export const patchUser = (form) =>
    request('auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(form),
    });

export const getUser = () =>
    request('auth/user', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
    });
