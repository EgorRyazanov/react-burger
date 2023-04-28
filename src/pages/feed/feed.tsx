import React, { FC } from 'react';
import FeedOrders from '../../components/feed-orders/feed-orders';
import InformationTable from '../../components/information-table/information-table';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_START,
} from '../../services/constants/websocket';
import { TRootState } from '../../services/reducers/root';
import { WS_BASE_URL } from '../../utils/constants';
import preloader from '../../assets/images/preloader.svg';
import styles from './feed.module.css';

const getWS = (state: TRootState) => state.websocket;

const Feed: FC = () => {
    const dispatch = useTypedDispatch();
    const { wsConnected, ordersInformation } = useTypedSelector(getWS);

    React.useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: `${WS_BASE_URL}/all`,
        });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE });
        };
    }, []);
    return (
        <>
            {ordersInformation?.orders && wsConnected ? (
                <div className={`container pl-4 pt-10`}>
                    <p className='text text_type_main-large mb-5'>
                        Лента заказов
                    </p>
                    <div className='flex'>
                        {
                            <>
                                <FeedOrders />
                                <InformationTable />
                            </>
                        }
                    </div>
                </div>
            ) : (
                <div className={`container pl-4 pt-10 ${styles.preloader}`}>
                    <img src={preloader} alt='загрузочная картинка' />
                </div>
            )}
        </>
    );
};

export default Feed;
