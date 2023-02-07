import React from 'react';
import {
    DragIcon,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-component.module.css';

const ConstructorComponent = React.memo((probs) => {
    console.log(probs.ingredients);
    return (
        <>
            {probs.ingredients.map((ingredient) => (
                <div
                    key={ingredient._id}
                    className={`flex ${styles.container} ${styles.card}`}
                    style={{ height: 80 }}
                >
                    <div className="pt-8 pb-8">
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={false}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                </div>
            ))}
        </>
    );
});

export default ConstructorComponent;
