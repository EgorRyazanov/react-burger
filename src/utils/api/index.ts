import { BASE_URL } from '../constants';
import { TResponse } from '../types/api';

const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = <T extends TResponse>(res: T): T | Promise<never> => {
    if (res && res.success) {
        return res;
    }

    return Promise.reject(`Ответ не success: ${res}`);
};

const request = <T extends TResponse>(
    endpoint: string,
    options?: any
): Promise<T> => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then((res) => checkResponse<T>(res))
        .then((res) => checkSuccess<T>(res));
};

export default request;
