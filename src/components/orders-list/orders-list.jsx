import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './orders-list.module.css';
import Order from '../order/order';

export default function OrdersList({ width, orders }) {
    useEffect(() => {}, [orders])
    if (orders.length) {
        return (
            <section className={styles.container} style={{ width: `${width}` }}>
                <div className={`${styles.list} pr-2`}>
                    {orders.map((order) => {
                        return (
                            <Order
                                order={order}
                                key={order._id} />
                        )
                    })}
                </div>
            </section>
        )
    }
}

OrdersList.propTypes = {
    width: PropTypes.string,
    orders: PropTypes.array.isRequired,
}
