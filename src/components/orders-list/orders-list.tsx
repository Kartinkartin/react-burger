import React, { useEffect, FunctionComponent } from 'react';
import styles from './orders-list.module.css';
import { Order } from '../order/order';

type TOrderListProps = {
    width: string, 
    orders: Array<any>
}
export const OrdersList: FunctionComponent<TOrderListProps> = ({ width, orders }: TOrderListProps) => {
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
    return null
}
