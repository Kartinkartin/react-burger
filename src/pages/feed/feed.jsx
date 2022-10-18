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
                <OrdersList />
                <OrderStatistics />
            </div>
        </main>
    )
}