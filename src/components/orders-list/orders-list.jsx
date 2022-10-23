import React from 'react';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
import PropTypes from 'prop-types';
import styles from './orders-list.module.css';
import Order from '../order/order';

export default function OrdersList({ width, orders }) {
    if (orders) {
        return (
            <section className={styles.container} style={{ width: `${width}` }}>
                <div className={`${styles.list} pr-2`}>
                    {orders.map((order) => {
                        return (
                            <Order
                                order={order}
                                key={uuidv4()} />
                        )
                    })}
                </div>
            </section>
        )
    }
}

OrdersList.propTypes = {
    width: PropTypes.string,
    orders: PropTypes.array.isRequired
}