import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useParams } from 'react-router-dom';
import styles from './feed-details.module.css';
import {
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TRootState } from '../../services/reducers/root';
import { TOrderDetails } from '../../services/actions/websocket';
import { TIngredient } from '../../utils/types/ingredient-type';
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_START,
} from '../../services/constants/websocket';
import { WS_BASE_URL } from '../../utils/constants';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';

const sort_by_count = (
    a: { ingredient: TIngredient; count: number },
    b: { ingredient: TIngredient; count: number }
): number => {
    return b.count - a.count;
};
const getPrice = (
    elements: Array<{ ingredient: TIngredient; count: number }>
) => {
    return elements.reduce(
        (acc, current) => acc + current.ingredient.price * current.count,
        0
    );
};

const getWS = (state: TRootState) => state.websocket;

const FeedOrder: React.FC = () => {
    const { ordersInformation } = useTypedSelector(getWS);

    const dispatch = useTypedDispatch();
    React.useEffect(() => {
        if (!ordersInformation) {
            dispatch({
                type: WS_CONNECTION_START,
                payload: `${WS_BASE_URL}/all`,
            });
        }
        return () => {
            if (!location?.state?.background) {
                dispatch({ type: WS_CONNECTION_CLOSE });
            }
        };
    }, []);
    const { id } = useParams();
    const location = useLocation();
    const background = location.state && location.state.background;
    const [price, setPrice] = React.useState<number | null>(null);
    const [order, setOrder] = React.useState<TOrderDetails | null>(null);
    const [pieces, setPieces] = React.useState<Map<string, number> | null>(
        null
    );
    const [orderIngredients, setOrderIngredients] = React.useState<Array<{
        ingredient: TIngredient;
        count: number;
    }> | null>(null);
    const { ingredients } = useTypedSelector((store) => store.fetchIngredients);

    React.useEffect(() => {
        if (ordersInformation) {
            setOrder(
                ordersInformation.orders.filter(
                    (element) => element._id === id
                )[0]
            );
        }
    }, [ordersInformation]);

    React.useEffect(() => {
        if (order) {
            const map = new Map();
            for (let ingredient of order.ingredients) {
                if (ingredient) {
                    if (!map.has(ingredient)) {
                        map.set(ingredient, 0);
                    }
                    map.set(ingredient, map.get(ingredient) + 1);
                }
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
                    count: pieces.get(key) as number,
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
                    >{`#000${order.number}`}</p>
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
