import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TabComponent = (probs) => {
    return (
        <div className="mb-10" style={{ display: 'flex' }}>
            <Tab
                value="bun"
                active={probs.current === 'bun'}
                onClick={probs.handleTabScroll}
            >
                Булки
            </Tab>
            <Tab
                value="sauce"
                active={probs.current === 'sauce'}
                onClick={probs.handleTabScroll}
            >
                Соусы
            </Tab>
            <Tab
                value="main"
                active={probs.current === 'main'}
                onClick={probs.handleTabScroll}
            >
                Начинки
            </Tab>
        </div>
    );
};

export default TabComponent;

TabComponent.propTypes = {
    current: PropTypes.string.isRequired,
    handleTabScroll: PropTypes.func.isRequired,
};
