import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
import styles from './feed-detail.module.css';
import AppHeader from '../../components/app-header/app-header';
import OrderIngredient from '../../components/order-ingredient/order-ingredient';
import { getWSOrders } from '../../services/selectors/selectors';

export function FeedDetailPage() {
    const { id } = useParams();
    const orders = useSelector(getWSOrders);
    const currentOrder = orders.find(item => item._id === id);
    const moment = require('moment');
    require('moment/locale/ru');
    const orderDate = moment(currentOrder.createdAt).calendar();
    debugger
    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <div className={styles.container}>
                    <h2 className={`${styles.number} text text_type_digits-default pb-10`}>
                        {`#${currentOrder.number}`}
                    </h2>
                    <h1 className='text text_type_main-medium pb-3'>
                        {currentOrder.name}
                    </h1>
                    <p className={`${styles.status} text text_type_main-default`}>
                        {currentOrder.status==='done' ? <>Выполнен</> : <>В работе</> }
                    </p>
                    <p className='text text_type_main-medium pt-15 pb-6'>Состав:</p>
                    <div>
                        {currentOrder.ingredients.map(item => {
                        return (
                        <OrderIngredient 
                        id={item}
                        key={uuidv4()} /> 
                        )})}
                    </div>
                    <p className={`${styles.date} text text_type_main-default pt-10`} >{orderDate}</p>
                </div>
            </div>
        </main>
    )
}