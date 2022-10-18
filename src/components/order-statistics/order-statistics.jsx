import React from 'react';
import styles from './order-statistics.module.css';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
import { testOrder } from '../../services/test-data'; //тесовый заказ

export function OrderStatistics() {
    return (
        <div className={styles.container}>
            <div className={styles.ready}>
                <h2 className="text text_type_main-medium">
                    Готовы:
                </h2>
                <div className={`${styles.turn} pt-6`}>
                    {testOrder.map(order => {
                        return (
                            <p
                                className={`${styles.ready_num} text text_type_digits-default`}
                                style={{ color: '#00CCCC' }}
                                key={uuidv4()}>
                                {order.num}
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
                    {testOrder.map(order => {
                        return (
                            <p
                                className={`${styles.ready_num} text text_type_digits-default`}
                                style={{ color: '#F2F2F3' }}
                                key={uuidv4()}>
                                {order.num}
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
                    25 000
                </p>
            </div>
            <div className={styles.done_today}>
                <h2 className="text text_type_main-medium">
                    Выполнено за сегодня:
                </h2>
                <p className="text text_type_digits-large">
                    150
                </p>
            </div>
        </div>
    )
}