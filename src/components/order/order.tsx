import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getApiIngredients } from '../../services/selectors/selectors';
import { TIngredient } from '../../services/types/data';

type TOrderProps = {
    order: any
}
export const Order: FunctionComponent<TOrderProps> = ({ order }: TOrderProps) => {
    const location = useLocation();
    const ingregientsApi = useSelector(getApiIngredients);
    const findCurrentIngredient = (item: string) => ingregientsApi.find(el => item === el._id)!;
    const price = order.ingredients.reduce((price: number, current: string) => {
        return price + findCurrentIngredient(current).price
    }, 0);
    const moment = require('moment'); // библиотека moment для даты
    require('moment/locale/ru');
    const orderDate = moment(order.createdAt).calendar();

    return (
        <Link
            className={`${styles.container} p-6 mb-6`}
            to={{
                pathname: `${location.pathname}/${order._id}`,
                state: { background: location }
            }} >
            <div className={`${styles.service_info} pb-6 text text_type_digits-default`}>
                #{order.number}
                <span className={`${styles.date} text text_type_main-default`} >
                    {orderDate}
                </span>
            </div>
            <h2 className="pb-6 text text_type_main-medium">
                {order.name}
            </h2>
            <div className={styles.order_info}>
                {ingregientsApi.length ?
                    <div className={styles.pictures_container}>
                        {order.ingredients
                            .map((item: string, index: number) => {
                                const ingredient: TIngredient = ingregientsApi.find(el => item === el._id)!;
                                const pic = ingredient.image;
                                const counter = order.ingredients.length - index;
                                const reactKey = uuidv4(); 
                                if (index < 5) {
                                    return (
                                        <div
                                            className={styles.image}
                                            style={{
                                                backgroundImage: `url("${pic}")`,
                                                left: index * 48
                                            }}
                                            key={reactKey} >

                                        </div>
                                    )
                                }
                                if (index === 5) {
                                    return (
                                        <div
                                            className={`${styles.image} ${styles.image_counter}`}
                                            style={{
                                                backgroundImage: `url("${pic}")`,
                                                left: index * 48,
                                            }}

                                            key={reactKey} >
                                            {(counter > 1) ?
                                                (
                                                    <p className={`${styles.counter} text text_type_main-default`}>
                                                        {`+${counter}`}
                                                    </p>
                                                ) :
                                                null
                                            }

                                        </div>
                                    )
                                }
                                return null
                            })
                            .reverse()
                        }
                    </div> :
                    null}
                <div className={styles.price_container}>
                    <p className="text text_type_main-medium pr-1">{price}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </Link>
    )
}