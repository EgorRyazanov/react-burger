import React from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';

const Card = React.memo((probs) => {
    const [counter, setCounter] = React.useState(0);

    const handleCounter = () => {
        setCounter(counter + 1);
        console.log(counter);
    };

    return (
        <div onClick={handleCounter} className={`${styles.card} mb-8`}>
            <div className={`pl-4 pr-4 ${styles.relative}`}>
                {counter > 0 && (
                    <Counter count={counter} size="default" extraClass="m-1" />
                )}
                <img
                    className="mb-1"
                    src={probs.element.image}
                    alt="ингридиет"
                />
                <div className={`flex mb-1 ${styles.price}`}>
                    <p className="text text_type_digits-default mr-1">
                        {probs.element.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            <p className={`text text_type_main-default ${styles.name}`}>
                {probs.element.name}
            </p>
        </div>
    );
});

export default Card;
