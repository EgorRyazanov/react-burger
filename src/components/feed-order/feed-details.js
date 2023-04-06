import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useParams } from 'react-router-dom';
import LoadingModal from '../loading-modal/loading-modal';
import styles from './feed-details.module.css';
import {
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

const data = {
    success: true,
    orders: [
        {
            ingredients: [
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733c8',
                '60d3b41abdacab0026a733ca',
                '60d3b41abdacab0026a733d0',
                '60d3b41abdacab0026a733cb',
                '60d3b41abdacab0026a733ca',
                '60d3b41abdacab0026a733cb',
            ],
            _id: '1',
            status: 'done',
            name: 'Space флюоресцентный бургер',
            number: 1,
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
        {
            ingredients: [
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733cb',
            ],
            _id: '2',
            status: 'done',
            name: 'Space флюоресцентный бургер',
            number: 2,
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
        {
            ingredients: [
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733cb',
            ],
            _id: '3',
            status: 'done',
            name: 'Space флюоресцентный бургер',
            number: 3,
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
        {
            ingredients: [
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733cb',
            ],
            _id: '4',
            status: 'done',
            name: 'Space флюоресцентный бургер',
            number: 4,
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
    ],
    total: 4,
    totalToday: 3,
};

const sort_by_count = (a, b) => {
    return b.count - a.count;
};
const getPrice = (elements) => {
    return elements.reduce(
        (acc, current) => acc + current.ingredient.price * current.count,
        0
    );
};

const FeedOrder = () => {
    const { id } = useParams();
    const location = useLocation();
    const background = location.state && location.state.background;
    const [price, setPrice] = React.useState(null);
    const [order, setOrder] = React.useState(null);
    const [pieces, setPieces] = React.useState(null);
    const [orderIngredients, setOrderIngredients] = React.useState(null);
    const { ingredients } = useTypedSelector((store) => store.fetchIngredients);

    React.useEffect(() => {
        setOrder(data.orders.filter((element) => element._id === id)[0]);
    }, []);

    React.useEffect(() => {
        if (order) {
            const map = new Map();
            for (let ingredient of order.ingredients) {
                if (!map.has(ingredient)) {
                    map.set(ingredient, 0);
                }
                map.set(ingredient, map.get(ingredient) + 1);
            }
            setPieces(map);
        }
    }, [order]);

    React.useEffect(() => {
        const temp = [];
        if (pieces && ingredients.length > 0) {
            for (let key of pieces.keys()) {
                const ingredient = ingredients.filter((ingredient) => {
                    return ingredient._id === key;
                })[0];
                temp.push({
                    ingredient: ingredient,
                    count: pieces.get(key),
                });
            }
        }
        setOrderIngredients(temp.sort(sort_by_count));
        setPrice(getPrice(temp));
    }, [pieces, ingredients]);
    return (
        ingredients &&
        orderIngredients &&
        order && (
            <div className={styles.container}>
                {!background && (
                    <p
                        className={`text text_type_digits-default text-center ${styles.title}`}
                    >{`#000${id}`}</p>
                )}
                <p className='text text_type_main-medium mt-10 mb-3'>
                    {order.name}
                </p>
                <p
                    className={`text text_type_main-default mb-15 ${styles.text_colored}`}
                >
                    Выполнен
                </p>
                <p className='text text_type_main-medium mb-6'>Состав</p>
                <div
                    className={
                        orderIngredients.length > 4
                            ? styles.order__ingredients
                            : 'mb-10'
                    }
                >
                    {orderIngredients.map((element, index) => {
                        return (
                            <div className={styles.order_structure} key={index}>
                                <div className={styles.image__container}>
                                    <img
                                        src={element.ingredient.image_mobile}
                                        alt={element.ingredient.name}
                                        className={
                                            styles.order_structure__image
                                        }
                                    />
                                </div>
                                <div
                                    className={styles.structure__text_container}
                                >
                                    <p
                                        className={`text text_type_main-default`}
                                    >
                                        {element.ingredient.name}
                                    </p>
                                    <div className='flex'>
                                        <p className='text text_type_digits-default mr-2'>
                                            {`${element.count} x ${element.ingredient.price}`}
                                        </p>
                                        <CurrencyIcon type='primary' />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.structure__text_container}>
                    <FormattedDate
                        className={styles.gray_text}
                        date={new Date(order.createdAt)}
                    />
                    <div className='flex'>
                        <p className='text text_type_digits-default mr-2'>
                            {price}
                        </p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        )
    );
};

export default FeedOrder;
