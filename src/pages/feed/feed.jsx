import React from 'react';
import styles from './feed.module.css';
import AppHeader from '../../components/app-header/app-header';
import OrdersList from '../../components/orders-list/orders-list';
import { OrderStatistics } from '../../components/order-statistics/order-statistics';

export function FeedPage() {
    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <h1 className={`${styles.title} text text_type_main-large pb-5`}>
                    Лента заказов
                </h1>
                <div className={styles.list} ><OrdersList width={'610px'} /></div>
                <div className={styles.statistics} ><OrderStatistics /></div>
            </div>
        </main>
    )
}