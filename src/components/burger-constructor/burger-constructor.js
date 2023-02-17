import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import ConstructorComponent from '../constructor-component/constructor-component';
import ConstructorPrice from '../constructor-price/constructor-price';
import { VALUE_BUN } from '../../utils/constants';
import { ApiContext } from '../../services/apiContext';

export default function BurgerConstructor() {
    const initialPrice = { price: 0 };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD': {
                const price =
                    ingredients.others.reduce(
                        (acc, current) => acc + current.price,
                        0
                    ) +
                    ingredients.buns.price * 2;
                return { ...state, price };
            }
            default:
                return { ...state };
        }
    };

    const { data } = React.useContext(ApiContext);
    const [isLoading, setLoading] = React.useState(true);
    const [ingredients, setIngridients] = React.useState({
        buns: null,
        others: [],
    });

    const [totalPrice, priceDispatch] = React.useReducer(reducer, initialPrice);
    React.useEffect(() => {
        setIngridients({
            buns: data.filter((element) => element.type === VALUE_BUN)[0],
            others: data
                .filter((element) => element.type !== VALUE_BUN)
                .slice(0, 6),
        });
        if (ingredients.buns) {
            setLoading(false);
            priceDispatch({ type: 'ADD' });
        }
    }, [data]);

    return (
        <div className={`${styles.global} pt-25 pl-4`}>
            {!isLoading && (
                <>
                    <div className={`flex ${styles.container} mb-4`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${ingredients.buns.name} верх`}
                            price={ingredients.buns.price}
                            thumbnail={ingredients.buns.image}
                        />
                    </div>
                    <div className={`mb-4 ${styles.scroll}`}>
                        <ConstructorComponent
                            ingredients={ingredients.others}
                        />
                    </div>
                    <div className={`flex ${styles.container} mb-10`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${ingredients.buns.name} низ`}
                            price={ingredients.buns.price}
                            thumbnail={ingredients.buns.image}
                        />
                    </div>
                    <ConstructorPrice
                        price={totalPrice.price}
                        id={[
                            ...ingredients.others.map((element) => element._id),
                            ingredients.buns._id,
                        ]}
                    />
                </>
            )}
        </div>
    );
}
