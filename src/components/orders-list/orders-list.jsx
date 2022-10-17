import React from 'react';
import styles from './orders-list.module.css';
import Order from '../order/order';
import { testOrder } from '../../services/test-data';

export default function OrdersList() {
    const testData = testOrder;
    debugger
    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large pt-10 pb-5">
                Лента заказов
            </h1>
            <div className={styles.list}>
                {testData.map(order =>{
                    return (
                        <Order order={order} />
                    )
                })}
            </div>
        </section>
    )
}

OrdersList.propTypes = {

}