export const USER = { name: 'Egor', email: 'aricsybsn@gmail.com' };
export const CONSTRUCTOR_BUN = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
};

export const INGREDIENT = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
};

export const ORDER = {
    createdAt: 'test-order',
    ingredients: [INGREDIENT, INGREDIENT, CONSTRUCTOR_BUN, CONSTRUCTOR_BUN],
    name: 'test-order',
    number: 'test-order',
    owner: {
        name: 'test-order',
        email: 'test-order',
        createdAt: 'test-order',
        updatedAt: 'test-order',
    },
    price: 1233,
    status: 'test-order',
    updatedAt: 'test-order',
    _id: 'test-order',
};

export const ORDER_DETAILS = {
    _id: 'test-data',
    ingredients: ['213', '1231'],
    status: 'test-data',
    name: 'test-data',
    createdAt: 'test-data',
    updatedAt: 'test-data',
    number: 123,
};
