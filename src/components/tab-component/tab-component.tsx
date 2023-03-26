import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TabIndexes, TTabs } from '../burger-ingredients/burger-ingredients';

type TTabComponent = {
    handleTabScroll: (value: TabIndexes, element: Element) => void;
    current: TabIndexes;
    tabs: TTabs;
};

const TabComponent: FC<TTabComponent> = ({
    tabs,
    handleTabScroll,
    current,
}) => {
    return (
        <div className='flex mb-10'>
            {tabs.map((tab) => (
                <Tab
                    value={tab.value}
                    active={current === tab.value}
                    onClick={() =>
                        handleTabScroll(tab.value, tab.ref.current as Element)
                    }
                    key={tab.value}
                >
                    {tab.title}
                </Tab>
            ))}
        </div>
    );
};

export default TabComponent;
