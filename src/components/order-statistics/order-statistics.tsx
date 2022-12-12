import React, { FunctionComponent } from 'react';
import styles from './order-statistics.module.css';
import { getTodayDone, getTotalDone, getWSOrders } from '../../services/selectors/selectors';
import { useSelector } from '../../services/hooks/hooks';

export const OrderStatistics: FunctionComponent = () => {
    const orders = useSelector(getWSOrders);
    const total = useSelector(getTotalDone);
    const totalToday = useSelector(getTodayDone);
    const todayOrders = orders.filter(order => {
        const orderDate = order.createdAt.slice(0, 10);
        const todayDate = new Date().toISOString().slice(0, 10);
        return orderDate === todayDate
    });
    return (
        <div className={styles.container}>
            <div className={styles.ready}>
                <h2 className="text text_type_main-medium">
                    Готовы:
                </h2>
                <div className={`${styles.turn} pt-6`}>
                    {todayOrders.filter(order => order.status === 'done')
                        .map((order, index) => {
                            if (index > 9) return null
                            return (
                                <p
                                    className={`${styles.ready_num} text text_type_digits-default pb-2`}
                                    style={{ color: '#00CCCC' }}
                                    key={order._id}>
                                    {order.number}
                                </p>
                            )
                        })}
                </div>
            </div>
            <div className={styles.process}>
                <h2 className="text text_type_main-medium">
                    В работе:
                </h2>
                <div className={`${styles.turn} pt-6`}>
                    {todayOrders.filter(order => order.status !== 'done')
                        .map(order => {
                            return (
                                <p
                                    className={`${styles.ready_num} text text_type_digits-default pb-2`}
                                    style={{ color: '#F2F2F3' }}
                                    key={order._id}>
                                    {order.number}
                                </p>
                            )
                        })}
                </div>
            </div>
            <div className={styles.done_total}>
                <h2 className="text text_type_main-medium">
                    Выполнено за все время:
                </h2>
                <p className="text text_type_digits-large">
                    {total}
                </p>
            </div>
            <div className={styles.done_today}>
                <h2 className="text text_type_main-medium">
                    Выполнено за сегодня:
                </h2>
                <p className="text text_type_digits-large">
                    {totalToday}
                </p>
            </div>
        </div>
    )
}
