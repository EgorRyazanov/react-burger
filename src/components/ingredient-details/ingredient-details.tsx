import React, {FC, useState, useEffect }  from 'react';
import styles from './ingredient-details.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { TRootState } from '../../services/reducers/root';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TIngredient } from '../../utils/types/ingredient-type';

const getIngredientsFromStore = (state: TRootState) => state.fetchIngredients;

const IngredientDetails: FC = () => {
    const { ingredients, fetchIngredientsRequest, fetchIngredientsFailed } =
        useTypedSelector(getIngredientsFromStore);
    const location = useLocation();
    const containerStyles = location.state?.background
        ? styles.elements_center
        : styles.detail_container_page;
    const { ingredientId } = useParams();
    const [ingredient, setIngredient] = useState<TIngredient | null>(
        null
    );

    useEffect(() => {
        setIngredient(
            ingredients.filter((element) => element._id === ingredientId)[0]
        );
    }, [ingredients]);
    return (
        <>
            {!fetchIngredientsRequest &&
                !fetchIngredientsFailed &&
                ingredient && (
                    <div className={containerStyles}>
                        <div className={styles.container}>
                            <img
                                src={ingredient.image_large}
                                className='mb-4'
                                alt={ingredient.name}
                            />
                            <p
                                className={`text text_type_main-medium mb-8 ${styles.text_center}`}
                            >
                                {ingredient.name}
                            </p>
                            <div className='flex'>
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
                )}
        </>
    );
};

export default IngredientDetails;
