import React from 'react';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
import styles from './orders-list.module.css';
import Order from '../order/order';
import { testOrder } from '../../services/test-data';

export default function OrdersList({ width }) {
    const testData = testOrder;
    return (
        <section className={styles.container} style={{ width: `${width}` }}>
            <div className={`${styles.list} pr-2`}>
                {testData.map(order =>{
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

OrdersList.propTypes = {

}