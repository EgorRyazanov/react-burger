import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TabComponent = ({ tabs, handleTabScroll, current }) => {
    return (
        <div className="flex mb-10">
            {tabs.map((tab) => (
                <Tab
                    value={tab.value}
                    active={current === tab.value}
                    onClick={(e) => handleTabScroll(tab.value, tab.ref.current)}
                    key={tab.value}
                >
                    {tab.title}
                </Tab>
            ))}
        </div>
    );
};

export default TabComponent;

TabComponent.propTypes = {
    current: PropTypes.string.isRequired,
    handleTabScroll: PropTypes.func.isRequired,
    tab: PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        ref: PropTypes.string.isRequired,
    }),
};
