import React from 'react';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
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