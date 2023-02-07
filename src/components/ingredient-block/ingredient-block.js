import React from 'react';
import Card from '../card/card';
import styles from './ingredient-block.module.css';
import PropTypes from 'prop-types';
import { dataElementProp } from '../../utils/prop-types';

const IngredientBlock = React.memo((probs) => {
    return (
        <div id={probs.id} className={styles.block}>
            <p className="text text_type_main-large mb-2">{probs.name}</p>
            <div className={`flex pt-6 pl-4 pr-2 ${styles.container}`}>
                {probs.ingredients.map((element) => (
                    <Card key={element._id} element={element} />
                ))}
            </div>
        </div>
    );
});

export default IngredientBlock;

IngredientBlock.propTypes = {
    id: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(dataElementProp).isRequired,
};
