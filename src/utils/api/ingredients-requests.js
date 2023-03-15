import request from './index';

export const getIngredients = () => request('ingredients');

export const getOrder = (ingredients) =>
    request('orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
            ingredients: ingredients,
        }),
    });
