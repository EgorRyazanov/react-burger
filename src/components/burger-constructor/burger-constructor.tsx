import React, { FC, useMemo } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ConstructorComponent from '../constructor-component/constructor-component';
import ConstructorPrice from '../constructor-price/constructor-price';
import { VALUE_BUN } from '../../utils/constants';
import { useDrop } from 'react-dnd';
import { getPrice } from '../../utils/get-price';
import {
    addElementToConstructorAction,
    addBunToConstructorAction,
    removeElementFromConstructorAction,
    clearConstructorAction,
    updateBunInConstructorAction,
} from '../../services/actions/constructor';
import { TRootState } from '../../services/reducers/root';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { TIngredient } from '../../utils/types/ingredient-type';
import { TConstructorElement } from '../../utils/types/actions-types/constructor-types';

type TBurgerConstructor = {
    userLoaded: boolean;
};

const getConstructorFromStore = (state: TRootState) => state.constructorBurger;

const getIngredientsFromStore = (state: TRootState) =>
    state.fetchIngredients.ingredients;

const BurgerConstructor: FC<TBurgerConstructor> = ({ userLoaded }) => {
    const ingredients = useTypedSelector(getIngredientsFromStore);
    const { parts, bun } = useTypedSelector(getConstructorFromStore);
    const dispatch = useTypedDispatch();
    const [{ isOver }, dropTargerRef] = useDrop({
        accept: 'ингредиент',
        drop(item: TIngredient) {
            if (!bun) {
                if (item.type === VALUE_BUN) {
                    dispatch(addBunToConstructorAction(item));
                }
            } else {
                if (item.type !== VALUE_BUN) {
                    dispatch(addElementToConstructorAction(item));
                } else {
                    dispatch(updateBunInConstructorAction(item));
                }
            }
            return item;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    const borderParts = isOver ? { outline: 'solid #4C4CFF 1px' } : {};

    const price = useMemo(() => {
        if (bun !== null) {
            return getPrice(parts, bun);
        }
        return 0;
    }, [parts, bun]);

    return (
        <>
            {ingredients && (
                <div
                    ref={dropTargerRef}
                    className={`${styles.global} pt-25 pl-4`}
                >
                    <div className={`${styles.ingredients} mb-10`}>
                        {!bun && (
                            <p className='text text_type_main-large pt-25'>
                                Вставьте сюда булочку
                            </p>
                        )}
                        {bun && (
                            <>
                                <div
                                    className={`flex ${styles.container} mb-4`}
                                >
                                    <ConstructorElement
                                        type='top'
                                        isLocked={false}
                                        text={`${bun.name} верх`}
                                        price={bun.price}
                                        thumbnail={bun.image}
                                        handleClose={() =>
                                            dispatch(clearConstructorAction)
                                        }
                                    />
                                </div>
                                <div
                                    style={borderParts}
                                    className={`mb-4 ${styles.scroll}`}
                                >
                                    {parts.map((ingredient, index) => {
                                        return (
                                            <ConstructorComponent
                                                handleClose={(
                                                    ingredient: TConstructorElement
                                                ) => {
                                                    dispatch(
                                                        removeElementFromConstructorAction(
                                                            ingredient.dragId
                                                        )
                                                    );
                                                }}
                                                ingredient={ingredient}
                                                index={index}
                                                key={ingredient.dragId}
                                            />
                                        );
                                    })}
                                </div>
                                <div className={`flex ${styles.container}`}>
                                    <ConstructorElement
                                        type='bottom'
                                        isLocked={false}
                                        text={`${bun.name} низ`}
                                        price={bun.price}
                                        thumbnail={bun.image}
                                        handleClose={() =>
                                            dispatch(clearConstructorAction)
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <ConstructorPrice
                        price={price}
                        userLoaded={userLoaded}
                        id={[
                            ...parts.map((element) => element?._id),
                            bun?._id as string,
                        ]}
                    />
                </div>
            )}
        </>
    );
};

export default BurgerConstructor;
