import { TUser } from '../../services/actions/user';
import { TIngredient } from './ingredient-type';
import { TOrder } from './order-type';

export type TResponseOrder = {
    name: string;
    order: TOrder;
    success: boolean;
};

export type TResponseForgotPassword = {
    success: boolean;
    message: string;
};

export type TResponseResetPassword = {
    success: boolean;
    message: string;
};

export type TResponseRegister = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
};

export type TResponseLogin = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
};

export type TResponseRefresh = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};

export type TResponseLogout = {
    success: boolean;
    message: string;
};

export type TResponseUser = {
    success: boolean;
    user: TUser;
};

export type TResponseIngredients = {
    success: boolean;
    data: Array<TIngredient>;
};

export type TResponse =
    | TResponseUser
    | TResponseLogout
    | TResponseRefresh
    | TResponseLogin
    | TResponseRegister
    | TResponseResetPassword
    | TResponseForgotPassword
    | TResponseOrder
    | TResponseIngredients;
