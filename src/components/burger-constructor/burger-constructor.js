import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import data from '../../utils/constructor-data';
import styles from './burger-constructor.module.css';
import ConstructorComponent from '../constructor-component/constructor-component';
import ConstructorPrice from '../constructor-price/constructor-price';
import { VALUE_BUN } from '../../utils/constants';

export default function BurgerConstructor() {
    const buns = React.useMemo(
        () => data.filter((element) => element.type === VALUE_BUN),
        [data]
    );
    const ingredients = React.useMemo(
        () => data.filter((element) => element.type !== VALUE_BUN),
        [data]
    );
    const price = React.useMemo(() => {
        return data.reduce((acc, current) => acc + current.price, 0);
    }, [data]);
    return (
        <div className="pt-25 pl-4" style={{ width: 600, height: 912 }}>
            <div
                style={{ width: 568 }}
                className={`flex ${styles.container} mb-4`}
            >
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={buns[0].name}
                    price={buns[0].price}
                    thumbnail={buns[0].image}
                />
            </div>
            <div className={`mb-4 ${styles.scroll}`}>
                <ConstructorComponent ingredients={ingredients} />
            </div>
            <div
                style={{ width: 568 }}
                className={`flex ${styles.container} mb-10`}
            >
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={buns[1].name}
                    price={buns[1].price}
                    thumbnail={buns[1].image}
                />
            </div>
            <ConstructorPrice price={price} />
        </div>
    );
}
