import React, { FC } from 'react';
import styles from './feed-orders.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const getIngredients = (state) => state.fetchIngredients;
const getWS = (state) => state.websocket;

const FeedOrders = () => {
    const location = useLocation();
    console.log(location);
    const { ordersInformation } = useTypedSelector(getWS);
    const { ingredients } = useTypedSelector(getIngredients);
    const [orders, setOrders] = React.useState(null);
    React.useEffect(() => {
        const localOrders = [];
        if (ordersInformation && ingredients.length > 0) {
            ordersInformation.orders.forEach((order) => {
                let price = 0;
                const orderIngredients = [];
                order.ingredients.forEach((id) => {
                    const ingredient = ingredients.filter(
                        (element) => element._id === id
                    )[0];
                    orderIngredients.push(ingredient);
                    price += ingredient.price;
                });
                localOrders.push({
                    orderIngredients,
                    price,
                    name: order.name,
                    _id: order._id,
                    number: order.number,
                    createdAt: order.createdAt,
                });
            });
        }
        if (localOrders.length > 0) {
            setOrders(localOrders);
        }
    }, [ordersInformation, ingredients]);
    return (
        orders && (
            <div className={styles.container}>
                {orders.map((order) => {
                    const count = order.orderIngredients.length;
                    const isCountCrowded = count > 6;
                    const imagesCount = isCountCrowded ? 6 : count;
                    const ingredientsToShow = order.orderIngredients.slice(
                        0,
                        imagesCount
                    );
                    return (
                        <Link
                            to={`/feed/${order._id}`}
                            state={{ background: location }}
                            key={order._id}
                            className={styles.card_container}
                        >
                            <div className={styles.card__header}>
                                <p className='text text_type_digits-default'>
                                    {`#000${order.number}`}
                                </p>
                                <FormattedDate
                                    className={styles.card__text}
                                    date={new Date(order.createdAt)}
                                />
                            </div>
                            <p className='text text_type_main-medium mb-6'>
                                {order.name}
                            </p>
                            <div className={styles.card__footer}>
                                <ul className={styles.card__images}>
                                    {ingredientsToShow.map(
                                        (ingredient, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className={
                                                        styles.image__container
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            ingredient.image_mobile
                                                        }
                                                        alt={ingredient.name}
                                                        className={
                                                            index === 5 &&
                                                            isCountCrowded
                                                                ? styles.card__image_special
                                                                : styles.card__image
                                                        }
                                                    />
                                                    {index === 5 &&
                                                        isCountCrowded && (
                                                            <p
                                                                className={`text text_type_digits-default ${styles.image_counter}`}
                                                            >
                                                                {`+${
                                                                    count - 5
                                                                }`}
                                                            </p>
                                                        )}
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                                <div className={styles.price}>
                                    <p className='text text_type_digits-default text-center mr-2'>
                                        {order.price}
                                    </p>
                                    <CurrencyIcon type='primary' />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        )
    );
};

export default FeedOrders;
