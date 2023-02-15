import { URL_DATA, URL_ORDER } from '../utils/constants';

export const getData = async () => {
    try {
        const response = await fetch(URL_DATA);
        return response.ok
            ? await response.json()
            : response
                  .json()
                  .then((error) => Promise.reject(error))
                  .catch(
                      () =>
                          new Error(
                              'Ошибка при получении данных об ингредиентах - модуль utils/api'
                          )
                  );
    } catch (error) {
        new Error(
            'Ошибка при получении данных об ингредиентах - модуль utils/api'
        );
    }
};

export const getOrder = async (ingredients) => {
    try {
        const response = await fetch(URL_ORDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients: ingredients,
            }),
        });
        return response.ok
            ? await response.json()
            : response
                  .json()
                  .then((error) => Promise.reject(error))
                  .catch(
                      () =>
                          new Error(
                              'Ошибка при получении данных об ингредиентах - модуль utils/api'
                          )
                  );
    } catch (error) {
        new Error('Ошибка при получении данных о заказе - модуль utils/api');
    }
};
