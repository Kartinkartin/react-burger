import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа
import PropTypes from 'prop-types';
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getApiIngredients } from '../../services/selectors/selectors';
import moment from 'moment';

export default function Order({ order }) {
    const location = useLocation();
    const ingregientsApi = useSelector(getApiIngredients);
    const findCurrentIngredient = (item) => ingregientsApi.find(el => item === el._id);
    const price = order.ingredients.reduce((price, current) => {
        return price + findCurrentIngredient(current).price
    }, 0);
    const moment = require('moment');
    require('moment/locale/ru');
    const orderDate = moment(order.createdAt).calendar();

    return (
        <Link
            className={`${styles.container} p-6 mb-6`}
            to={`${location.pathname}/${order._id}`}>
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
                            .map((item, index) => {
                                const ingredient = ingregientsApi.find(el => item === el._id);
                                const pic = ingredient.image;
                                const counter = order.ingredients.length - index
                                if (index < 5) {
                                    return (
                                        <div
                                            className={styles.image}
                                            style={{
                                                backgroundImage: `url("${pic}")`,
                                                left: index * 48
                                            }}
                                            key={uuidv4()} >

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

                                            key={uuidv4()} >
                                            {(order.ingredients.length - index > 1) ?
                                                (
                                                    <p className={`${styles.counter} text text_type_main-default`}>
                                                        {`+${order.ingredients.length - index}`}
                                                    </p>
                                                ) :
                                                null
                                            }

                                        </div>
                                    )
                                }
                                if (index > 5) {
                                    return null
                                }
                            })
                            .reverse()
                        }
                    </div> :
                    null}
                <div className={styles.price_container}>
                    <p className="text text_type_main-medium pr-1">{price}</p>
                    <CurrencyIcon />
                </div>
            </div>
        </Link>
    )
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
}