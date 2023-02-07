import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import data from '../../utils/constructor-data';
import styles from './burger-constructor.module.css';
import ConstructorComponent from '../constructor-element/constructor-component';
import ConstructorPrice from '../constructor-price/constructor-price';

export default function BurgerConstructor() {
    const buns = data.filter((element) => element.type === 'bun');
    const ingredients = data.filter((element) => element.type !== 'bun');
    const [price, setPrice] = React.useState(0);
    React.useEffect(() => {
        setPrice(data.reduce((acc, current) => acc + current.price, 0));
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
