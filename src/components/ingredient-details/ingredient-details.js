import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import { dataElementProp } from '../../utils/prop-types';

export default function IngredientDetails({ ...ingredient }) {
    return (
        <div className={styles.elements_center}>
            <div className={styles.container}>
                <img
                    src={ingredient.image_large}
                    className="mb-4"
                    alt={ingredient.name}
                />
                <p
                    className={`text text_type_main-medium mb-8 ${styles.text_center}`}
                >
                    {ingredient.name}
                </p>
                <div className="flex">
                    <div className={`${styles.data}`}>
                        <p
                            className={`text text_type_main-small text_color_inactive ${styles.text_center}`}
                        >
                            Калории,ккал
                        </p>
                        <p
                            className={`text text_type_main-small text_color_inactive ${styles.text_center}`}
                        >
                            {ingredient.calories}
                        </p>
                    </div>
                    <div className={`${styles.data}`}>
                        <p
                            className={`text text_type_main-small text_color_inactive ${styles.text_center}`}
                        >
                            Белки, г
                        </p>
                        <p
                            className={`text text_type_main-small text_color_inactive ${styles.text_center}`}
                        >
                            {ingredient.proteins}
                        </p>
                    </div>
                    <div className={`${styles.data}`}>
                        <p
                            className={`text text_type_main-small text_color_inactive ${styles.text_center}`}
                        >
                            Жиры, г
                        </p>
                        <p
                            className={`text text_type_main-small text_color_inactive ${styles.text_center}`}
                        >
                            {ingredient.fat}
                        </p>
                    </div>
                    <div className={`${styles.data}`}>
                        <p
                            className={`text text_type_main-small text_color_inactive ${styles.text_center}`}
                        >
                            Углеводы, г
                        </p>
                        <p
                            className={`text text_type_main-small text_color_inactive ${styles.text_center}`}
                        >
                            {ingredient.carbohydrates}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    ingredient: dataElementProp,
};
