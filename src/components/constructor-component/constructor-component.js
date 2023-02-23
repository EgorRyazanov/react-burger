import React from 'react';
import {
    DragIcon,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-component.module.css';
import PropTypes from 'prop-types';
import { dataElementProp } from '../../utils/prop-types';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { updateComponentsConstructorAction } from '../../services/actions/constructor';

const ConstructorComponent = React.memo(
    ({ ingredient, handleClose, index }) => {
        const dispatch = useDispatch();
        const ref = React.useRef(null);
        const [{ handlerId }, drop] = useDrop({
            accept: 'конструктор',
            collect(monitor) {
                return {
                    handlerId: monitor.getHandlerId(),
                };
            },
            hover(item, monitor) {
                if (!ref.current) {
                    return;
                }
                const dragIndex = item.index;
                const hoverIndex = index;
                if (dragIndex === hoverIndex) {
                    return;
                }
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
        const [{ isDragging }, drag] = useDrag({
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
        );
    }
);

export default ConstructorComponent;

ConstructorComponent.propTypes = {
    ingredient: dataElementProp.isRequired,
    handleClose: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};
