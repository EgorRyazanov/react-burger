import React from 'react';
import styles from './ingredient-details.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchIngredientsAction } from '../../services/actions/fetch-ingredients';

const getIngredientsFromStore = (state) => state.fetchIngredients;

export default function IngredientDetails() {
    const { ingredients, fetchIngredientsRequest, fetchIngredientsFailed } =
        useSelector(getIngredientsFromStore);
    const location = useLocation();
    const containerStyles = location.state?.background
        ? styles.elements_center
        : styles.detail_container_page;
    const { ingredientId } = useParams();
    const [ingredient, setIngredient] = React.useState(null);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchIngredientsAction());
    }, []);

    React.useEffect(() => {
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
}
