import { URL } from '../utils/constants';

export const getData = async () => {
    try {
        const response = await fetch(URL);
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
