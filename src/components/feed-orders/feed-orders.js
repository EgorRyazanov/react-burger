import React, { FC } from 'react';
import styles from './feed-orders.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TRootState } from '../../services/reducers/root';
import { getPrice } from '../../utils/get-price';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const getIngredients = (state) => state.fetchIngredients;

const FeedOrders = ({ orders_information }) => {
    const location = useLocation();
    const { ingredients } = useTypedSelector(getIngredients);
    return (
        ingredients.length > 0 && (
            <div className={styles.container}>
                {orders_information.orders.map((order) => {
                    const count = order.ingredients.length;
                    const isCountCrowded = count > 6;
                    const imagesCount = isCountCrowded ? 6 : count;
                    const ingredientsToShow = order.ingredients.slice(
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
                                    {ingredientsToShow.map((id, index) => {
                                        const ingredient = ingredients.filter(
                                            (element) => {
                                                return element._id === id;
                                            }
                                        );

                                        return (
                                            <li
                                                key={index}
                                                className={
                                                    styles.image__container
                                                }
                                            >
                                                <img
                                                    src={
                                                        ingredient[0]
                                                            .image_mobile
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
                                                            {`+${count - 5}`}
                                                        </p>
                                                    )}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className={styles.price}>
                                    <p className='text text_type_digits-default text-center mr-2'>
                                        {order.number * 1124}
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
