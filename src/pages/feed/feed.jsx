import React, { FC } from 'react';
import FeedOrders from '../../components/feed-orders/feed-orders';
import styles from './feed.module.css';
import InformationTable from '../../components/information-table/information-table';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const getWS = (state) => state.websocket;

const Feed = () => {
    const { wsConnected, ordersInformation } = useTypedSelector(getWS);
    return (
        <>
            {ordersInformation?.orders && wsConnected && (
                <div className={`container pl-4 pt-10`}>
                    <p className='text text_type_main-large mb-5'>
                        Лента заказов
                    </p>
                    <div className='flex'>
                        {
                            <>
                                <FeedOrders
                                    ordersInformation={ordersInformation}
                                />
                                <InformationTable
                                    ordersInformation={ordersInformation}
                                />
                            </>
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Feed;
