import React, { FC } from 'react';
import styles from './feed-orders.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { TRootState } from '../../services/reducers/root';
import { TIngredient } from '../../utils/types/ingredient-type';

const getIngredients = (state: TRootState) => state.fetchIngredients;
const getWS = (state: TRootState) => state.websocket;

type TOrder = {
    orderIngredients: Array<TIngredient>;
    price: number;
    name: string;
    _id: string;
    number: number;
    createdAt: string;
    status: { text: string; style: { color: string } };
};

const FeedOrders: FC = () => {
    const location = useLocation();
    const { ordersInformation } = useTypedSelector(getWS);
    const { ingredients } = useTypedSelector(getIngredients);
    const [orders, setOrders] = React.useState<Array<TOrder> | null>(null);
    React.useEffect(() => {
        const localOrders: Array<TOrder> = [];
        if (ordersInformation?.orders && ingredients.length > 0) {
            ordersInformation.orders.forEach((order) => {
                let price = 0;
                const orderIngredients: Array<TIngredient> = [];
                order.ingredients.forEach((id) => {
                    const ingredient = ingredients.filter(
                        (element) => element._id === id
                    )[0];
                    orderIngredients.push(ingredient);
                    price += ingredient.price;
                });
                let status = null;
                if (order.status === 'done') {
                    status = {
                        text: 'Выполнен',
                        style: {
                            color: 'rgb(0, 204, 204)',
                        },
                    };
                } else if (order.status === 'pending') {
                    status = {
                        text: 'Готовится',
                        style: { color: 'red' },
                    };
                } else {
                    status = {
                        text: 'Создан',
                        style: { color: 'white' },
                    };
                }
                localOrders.push({
                    orderIngredients,
                    price,
                    name: order.name,
                    _id: order._id,
                    number: order.number,
                    createdAt: order.createdAt,
                    status,
                });
            });
        }
        if (localOrders.length > 0) {
            setOrders(
                location.pathname === '/profile/orders'
                    ? localOrders.reverse()
                    : localOrders
            );
        }
    }, [ordersInformation, ingredients]);
    return (
        orders && (
            <div
                className={
                    location.pathname === '/feed' ? styles.container : ''
                }
            >
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
                            to={`${location.pathname}/${order._id}`}
                            state={{ background: location }}
                            key={order._id}
                            className={
                                location.pathname === '/feed'
                                    ? styles.card_container_feed
                                    : styles.card_container_profile
                            }
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
                            {location.pathname === '/profile/orders' && (
                                <p
                                    className={`text text_type_main-default mb-6`}
                                    style={order.status.style}
                                >
                                    {order.status.text}
                                </p>
                            )}
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
