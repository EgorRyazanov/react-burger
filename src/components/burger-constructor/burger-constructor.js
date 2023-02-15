import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import ConstructorComponent from '../constructor-component/constructor-component';
import ConstructorPrice from '../constructor-price/constructor-price';
import { VALUE_BUN } from '../../utils/constants';
import { ApiContext } from '../../services/apiContext';

export default function BurgerConstructor() {
    const initialPrice = { price: 0 };
    const reducer = () => {
        return (
            ingredients.others.reduce(
                (acc, current) => acc + current.price,
                0
            ) +
            ingredients.buns.price * 2
        );
    };

    const { data } = React.useContext(ApiContext);
    const [isLoading, setLoading] = React.useState(true);
    const [ingredients, setIngridients] = React.useState({
        buns: null,
        others: [],
    });

    const [price, priceDispatch] = React.useReducer(reducer, initialPrice);
    React.useEffect(() => {
        setIngridients({
            buns: data.filter((element) => element.type === VALUE_BUN)[0],
            others: data
                .filter((element) => element.type !== VALUE_BUN)
                .slice(0, 6),
        });
        if (ingredients.buns) {
            setLoading(false);
            priceDispatch();
        }
    }, [data]); // данные отображаются не с первого раза (иногда нужно пару раз тыкать f5, как это фиксить?)

    return (
        <div className="pt-25 pl-4" style={{ width: 600, height: 912 }}>
            {!isLoading && (
                <>
                    <div
                        style={{ width: 568 }}
                        className={`flex ${styles.container} mb-4`}
                    >
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
                    <div
                        style={{ width: 568 }}
                        className={`flex ${styles.container} mb-10`}
                    >
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${ingredients.buns.name} низ`}
                            price={ingredients.buns.price}
                            thumbnail={ingredients.buns.image}
                        />
                    </div>
                    <ConstructorPrice
                        price={price}
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
