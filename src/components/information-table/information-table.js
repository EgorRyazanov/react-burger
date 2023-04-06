import React, { FC } from 'react';
import styles from './information-table.module.css';

const data = {
    numbers: [123, 124, 125, 126],
};

const cutOrders = (array) => {
    if (array.length > 20) {
        array = array.slice(0, 20);
    }
    return array;
};

const filterOrders = (orders) => {
    const done = [];
    const pending = [];
    orders.forEach((element) => {
        if (element.status === 'done') {
            done.push(element.number);
        } else {
            pending.push(element.number);
        }
    });
    return { done: cutOrders(done), pending: cutOrders(pending) };
};

const InformationTable = ({ orders_information }) => {
    const [numbers, setNumbers] = React.useState(null);
    React.useEffect(() => {
        setNumbers(filterOrders(orders_information.orders));
    }, [orders_information]);
    return (
        <>
            {numbers && (
                <div className={styles.container}>
                    <div className='flex mb-15'>
                        <div className={styles.mini_table}>
                            <p className={`text text_type_main-medium mb-6`}>
                                Готовы:
                            </p>
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
                        </div>
                        <div className={styles.mini_table}>
                            <p className={`text text_type_main-medium mb-6`}>
                                В работе:
                            </p>
                            <div className={`${styles.order_numbers}`}>
                                {numbers.pending.map((element) => (
                                    <p
                                        key={element}
                                        className={`text text_type_digits-default`}
                                    >
                                        {element}
                                    </p>
                                ))}
                            </div>
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
                        {orders_information.total}
                    </p>
                    <p
                        className={`text text_type_main-medium ${styles.text_light}`}
                    >
                        Выполнено за сегодня:
                    </p>
                    <p
                        className={`${styles.text_light} text text_type_digits-large mb-15`}
                    >
                        {orders_information.totalToday}
                    </p>
                </div>
            )}
        </>
    );
};

export default InformationTable;
