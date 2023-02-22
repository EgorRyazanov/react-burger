import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import ConstructorComponent from '../constructor-component/constructor-component';
import ConstructorPrice from '../constructor-price/constructor-price';
import { VALUE_BUN } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
    addElementToConstructorAction,
    addBunToConstructorAction,
    removeElementFromConstructorAction,
    removeBunFromConstructorAction,
    updateBunInConstructorAction,
    updateComponentsConstructorAction,
} from '../../services/actions';

export default function BurgerConstructor() {
    const { parts, bun } = useSelector((state) => state.constructorBurger);
    const dispatch = useDispatch();
    const [{ isOver }, dropTargerRef] = useDrop({
        accept: 'ингредиент',
        drop(item) {
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
    const initialPrice = { price: 0 };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD': {
                const price =
                    parts.reduce((acc, current) => acc + current?.price, 0) +
                        bun?.price * 2 || 0;
                return { ...state, price };
            }
            default:
                return { ...state };
        }
    };

    const [totalPrice, priceDispatch] = React.useReducer(reducer, initialPrice);
    const borderParts = isOver ? { outline: 'solid #4C4CFF 1px' } : null;

    React.useEffect(() => {
        priceDispatch({
            type: 'ADD',
        });
    }, [parts, bun]);

    const moveCard = React.useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = parts[dragIndex];
            const currentCards = [...parts];
            currentCards.splice(dragIndex, 1);
            currentCards.splice(hoverIndex, 0, dragCard);
            dispatch(updateComponentsConstructorAction(currentCards));
        },
        [parts, dispatch]
    );

    return (
        <div ref={dropTargerRef} className={`${styles.global} pt-25 pl-4`}>
            <div className={`${styles.ingredients} mb-10`}>
                {!bun && (
                    <p className="text text_type_main-large pt-25">
                        Вставьте сюда булочку
                    </p>
                )}
                {bun && (
                    <>
                        <div className={`flex ${styles.container} mb-4`}>
                            <ConstructorElement
                                type="top"
                                isLocked={false}
                                text={`${bun.name} верх`}
                                price={bun.price}
                                thumbnail={bun.image}
                                handleClose={(e) =>
                                    dispatch(removeBunFromConstructorAction)
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
                                        handleClose={(event, ingredient) => {
                                            dispatch(
                                                removeElementFromConstructorAction(
                                                    ingredient.dragId
                                                )
                                            );
                                        }}
                                        ingredient={ingredient}
                                        moveCard={moveCard}
                                        index={index}
                                        key={ingredient.dragId}
                                    />
                                );
                            })}
                        </div>
                        <div className={`flex ${styles.container}`}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={false}
                                text={`${bun.name} низ`}
                                price={bun.price}
                                thumbnail={bun.image}
                                handleClose={(e) =>
                                    dispatch(removeBunFromConstructorAction)
                                }
                            />
                        </div>
                    </>
                )}
            </div>
            <ConstructorPrice
                price={totalPrice.price}
                id={[...parts.map((element) => element?._id), bun?._id]}
            />
        </div>
    );
}
