import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
import moment from 'moment'; // библиотека uuid для форматирования даты 
import styles from './feed-detail.module.css';
import AppHeader from '../../components/app-header/app-header';
import OrderIngredient from '../../components/order-ingredient/order-ingredient';
import { getApiIngredients, getWSOrders } from '../../services/selectors/selectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function FeedDetailPage() {
    const { id } = useParams();
    const orders = useSelector(getWSOrders);
    const currentOrder = orders.find(item => item._id === id);
    const ingredientsList = currentOrder.ingredients.filter(
        (item, index) => currentOrder.ingredients.indexOf(item) === index
    );
    const ingredientsApi = useSelector(getApiIngredients);
    const price = currentOrder.ingredients.reduce((price, current) => {
        const currentPrice = ingredientsApi.find(el => el._id === current).price;
        return price + currentPrice
    }, 0)
    const moment = require('moment'); // библиотка для даты 
    require('moment/locale/ru');
    const orderDate = moment(currentOrder.createdAt).calendar();
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
                        {currentOrder.status === 'done' ? <>Выполнен</> : <>В работе</>}
                    </p>
                    <p className='text text_type_main-medium pt-15 pb-6'>Состав:</p>
                    <div className={`${styles.ingredients} pr-6`}>
                        {ingredientsList.map(item => {
                            const counter = currentOrder.ingredients.filter(el => el === item).length;
                            return (
                                <OrderIngredient
                                    id={item}
                                    counter={counter}
                                    key={uuidv4()} />
                            )
                        })}
                    </div>
                    <div className={`${styles.service_info} pt-10`}>
                        <p className={`${styles.date} text text_type_main-default`} >
                            {orderDate}
                        </p>
                        <p className={styles.price_container}>
                            <span className={`text text_type_digits-default pr-2`}>{price}</span>
                            <CurrencyIcon />
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}