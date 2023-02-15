import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { VALUE_BUN, VALUE_SAUCE, VALUE_MAIN } from '../../utils/constants';

const TabComponent = (props) => {
    return (
        <div className="flex mb-10">
            <Tab
                value={VALUE_BUN}
                active={props.current === 'bun'}
                onClick={props.handleTabScroll}
            >
                Булки
            </Tab>
            <Tab
                value={VALUE_SAUCE}
                active={props.current === 'sauce'}
                onClick={props.handleTabScroll}
            >
                Соусы
            </Tab>
            <Tab
                value={VALUE_MAIN}
                active={props.current === 'main'}
                onClick={props.handleTabScroll}
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
