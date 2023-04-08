import request from './index';
import { TResponseIngredients, TResponseOrder } from '../types/api';

export const getIngredients = (): Promise<TResponseIngredients> =>
    request('ingredients');

export const getOrder = (ingredients: Array<string>): Promise<TResponseOrder> =>
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
