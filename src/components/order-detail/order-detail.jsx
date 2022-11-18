import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getApiIngredients,getWSOrders } from "../../services/selectors/selectors";
import OrderIngredient from '../../components/order-ingredient/order-ingredient';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./order-detail.module.css";

export default function OrdertDetail() {
    const { id } = useParams();
    const orders = useSelector(getWSOrders);
    const currentOrder = orders.find(item => item._id === id);
    const ingredientsList = currentOrder ? currentOrder.ingredients.filter(
        (item, index) => currentOrder.ingredients.indexOf(item) === index
    ) : null;
    const ingredientsApi = useSelector(getApiIngredients);
    if (currentOrder) {
        
    }
    const price = currentOrder ? currentOrder.ingredients.reduce((price, current) => {
        const currentPrice = ingredientsApi.find(el => el._id === current).price;
        return price + currentPrice
    }, 0) : 0;
    const moment = require('moment'); // библиотека uuid для форматирования даты  
    require('moment/locale/ru');
    const orderDate = currentOrder ? moment(currentOrder.createdAt).calendar() : undefined;
    return (
        ingredientsList && ingredientsApi && (
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
                                key={item} />
                        )
                    })}
                </div>
                <div className={`${styles.service_info} pt-10`}>
                    <p className={`${styles.date} text text_type_main-default`} >
                        {orderDate}
                    </p>
                    <p className={styles.price_container}>
                        <span className={`text text_type_digits-default pr-2`}>
                            {price}
                        </span>
                        <CurrencyIcon />
                    </p>
                </div>
            </div>
        )
    )
}
