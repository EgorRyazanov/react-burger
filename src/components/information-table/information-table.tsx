import React, { FC } from 'react';
import styles from './information-table.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TRootState } from '../../services/reducers/root';
import { TOrderDetails } from '../../services/actions/websocket';

const cutOrders = (array: any) => {
    if (array.length > 20) {
        array = array.slice(0, 20);
    }
    return array;
};

const filterOrders = (
    orders: Array<TOrderDetails>
): { done: Array<number>; pending: Array<number> } => {
    const done: Array<number> = [];
    const pending: Array<number> = [];
    orders.forEach((element) => {
        if (element.status === 'done') {
            done.push(element.number);
        } else {
            pending.push(element.number);
        }
    });
    return { done: cutOrders(done), pending: cutOrders(pending) };
};

const getWS = (state: TRootState) => state.websocket;

const InformationTable: FC = () => {
    const { ordersInformation } = useTypedSelector(getWS);
    const [numbers, setNumbers] = React.useState<{
        done: number[];
        pending: number[];
    } | null>(null);
    React.useEffect(() => {
        if (ordersInformation) {
            setNumbers(filterOrders(ordersInformation.orders));
        }
    }, [ordersInformation]);
    return (
        <>
            {numbers && (
                <div className={styles.container}>
                    <div className='flex mb-15'>
                        <div className={styles.mini_table}>
                            <p className={`text text_type_main-medium mb-6`}>
                                Готовы:
                            </p>
                            {numbers.done.length > 10 ? (
                                <div className='flex'>
                                    <div
                                        className={`mr-9 ${styles.order_numbers}`}
                                    >
                                        {numbers.done
                                            .slice(0, 10)
                                            .map((element) => (
                                                <p
                                                    key={element}
                                                    className={`text text_type_digits-default ${styles.text_colored}`}
                                                >
                                                    {element}
                                                </p>
                                            ))}
                                    </div>
                                    <div
                                        className={`mr-9 ${styles.order_numbers}`}
                                    >
                                        {numbers.done
                                            .slice(10)
                                            .map((element) => (
                                                <p
                                                    key={element}
                                                    className={`text text_type_digits-default ${styles.text_colored}`}
                                                >
                                                    {element}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <div className={`mr-9 ${styles.order_numbers}`}>
                                    {numbers.done.map((element) => (
                                        <p
                                            key={element}
                                            className={`text text_type_digits-default ${styles.text_colored}`}
                                        >
                                            {element}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.mini_table}>
                            <p className={`text text_type_main-medium mb-6`}>
                                В работе:
                            </p>
                            {numbers.pending.length > 10 ? (
                                <div className='flex'>
                                    <div
                                        className={`mr-9 ${styles.order_numbers}`}
                                    >
                                        {numbers.pending
                                            .slice(0, 10)
                                            .map((element) => (
                                                <p
                                                    key={element}
                                                    className={`text text_type_digits-default`}
                                                >
                                                    {element}
                                                </p>
                                            ))}
                                    </div>
                                    <div
                                        className={`mr-9 ${styles.order_numbers}`}
                                    >
                                        {numbers.pending
                                            .slice(10)
                                            .map((element) => (
                                                <p
                                                    key={element}
                                                    className={`text text_type_digits-default`}
                                                >
                                                    {element}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <div className={`mr-9 ${styles.order_numbers}`}>
                                    {numbers.pending.map((element) => (
                                        <p
                                            key={element}
                                            className={`text text_type_digits-default`}
                                        >
                                            {element}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <p
                        className={`text text_type_main-medium ${styles.text_light}`}
                    >
                        Выполнено за все время:
                    </p>
                    <p
                        className={`${styles.text_light} text text_type_digits-large mb-15`}
                    >
                        {ordersInformation?.total}
                    </p>
                    <p
                        className={`text text_type_main-medium ${styles.text_light}`}
                    >
                        Выполнено за сегодня:
                    </p>
                    <p
                        className={`${styles.text_light} text text_type_digits-large mb-15`}
                    >
                        {ordersInformation?.totalToday}
                    </p>
                </div>
            )}
        </>
    );
};

export default InformationTable;
