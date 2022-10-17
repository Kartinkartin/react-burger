import React from 'react';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Order({ order }) {
    return (
        <div className={`${styles.container} p-6 mb-6`}>

            <div className={`${styles.service_info} pb-6 text text_type_digits-default`}>
                #{order.num}
                <span className={`${styles.date} text text_type_main-default`}>
                    {new Date().getFullYear()}
                    {/* дату поменять потом не забудь */}
                </span>
            </div>

            <h2 className="pb-6 text text_type_main-medium">
                {order.name}
            </h2>
            <div className={styles.order_info}>
                <div className={styles.pictures_container}>
                    {order.burger
                        .map((item, index) => {
                            debugger;
                            const pic = item.image;
                            return (
                                <div
                                    className={styles.image}
                                    style={{ backgroundImage: `url("${pic}")`, left: index * 48 }}
                                    key={uuidv4()} >

                                </div>
                            )
                        })
                        .reverse()
                    }
                </div>
                <div className={styles.price_container}>
                    <p className="text text_type_main-medium pr-1">{order.price}</p>
                    <CurrencyIcon />
                </div>
            </div>
        </div>
    )
}