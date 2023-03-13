import React from 'react';
import Card from '../card/card';
import styles from './ingredient-block.module.css';
import PropTypes from 'prop-types';
import { dataElementProp } from '../../utils/prop-types';

const IngredientBlock = React.memo(
    React.forwardRef((props, ref) => {
        return (
            <div className={`${styles.block}`}>
                <p
                    id={props.id}
                    ref={ref}
                    className="text text_type_main-large mb-2"
                >
                    {props.name}
                </p>
                <div className={`flex pt-6 pl-4 pr-2 ${styles.container}`}>
                    {props.ingredients.map((ingredient) => (
                        <Card
                            key={ingredient._id}
                            handleToggleModal={props.handleToggleModal}
                            ingredient={ingredient}
                        />
                    ))}
                </div>
            </div>
        );
    })
);

export default IngredientBlock;

IngredientBlock.propTypes = {
    id: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(dataElementProp.isRequired).isRequired,
    handleToggleModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};
