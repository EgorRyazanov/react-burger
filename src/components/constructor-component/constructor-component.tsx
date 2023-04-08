import React, { FC, memo, useRef } from 'react';
import {
    DragIcon,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-component.module.css';
import { useDrop, useDrag } from 'react-dnd';
import { updateComponentsConstructorAction } from '../../services/actions/constructor';
import { TConstructorElement } from '../../services/actions/constructor';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { DropTargetMonitor } from 'react-dnd';

type TConstructorComponent = {
    ingredient: TConstructorElement;
    handleClose: (ingredient: TConstructorElement) => void;
    index: number;
};

const ConstructorComponent: FC<TConstructorComponent> = memo(
    ({ ingredient, handleClose, index }) => {
        const dispatch = useTypedDispatch();
        const ref = useRef<HTMLDivElement>(null);
        const [{ handlerId }, drop] = useDrop<
            TConstructorElement,
            HTMLDivElement,
            any
        >({
            accept: 'конструктор',
            collect(monitor: DropTargetMonitor) {
                return {
                    handlerId: monitor.getHandlerId(),
                };
            },
            hover(item: TConstructorElement, monitor: DropTargetMonitor) {
                if (!ref.current) {
                    return;
                }
                const dragIndex = item.index as number;
                const hoverIndex = index;
                if (dragIndex === hoverIndex) {
                    return;
                }
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY =
                    (clientOffset?.y as number) - hoverBoundingRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                dispatch(
                    updateComponentsConstructorAction(hoverIndex, dragIndex)
                );
                item.index = hoverIndex;
            },
        });
        const [{ isDragging }, drag] = useDrag<
            TConstructorElement,
            HTMLDivElement,
            any
        >({
            type: 'конструктор',
            item: () => {
                return { ...ingredient, index: index };
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });
        const opacity = isDragging ? 0 : 1;
        drag(drop(ref));
        return (
            <div
                ref={ref}
                className={`flex ${styles.container} ${styles.card}`}
                data-handler-id={handlerId}
                style={{ opacity }}
            >
                <div className='pt-8 pb-8'>
                    <DragIcon type='primary' />
                </div>
                <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => handleClose(ingredient)}
                />
            </div>
        );
    }
);

export default ConstructorComponent;
