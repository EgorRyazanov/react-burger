import { BASE_URL } from '../../utils/constants';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }

    return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export default request;
