import React from 'react';
import {
    DragIcon,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-component.module.css';
import PropTypes from 'prop-types';
import { dataElementProp } from '../../utils/prop-types';

const ConstructorComponent = React.memo(({ ingredients, handleClose }) => {
    return (
        <>
            {ingredients.map((ingredient) => (
                <div
                    key={ingredient.dragId}
                    className={`flex ${styles.container} ${styles.card}`}
                >
                    <div className="pt-8 pb-8">
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        isLocked={false}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={(e) => handleClose(e, ingredient)}
                    />
                </div>
            ))}
        </>
    );
});

export default ConstructorComponent;

ConstructorComponent.propTypes = {
    ingredients: PropTypes.arrayOf(dataElementProp.isRequired).isRequired,
};
