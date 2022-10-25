import React from 'react';

import styles from './order-detail.module.css';
import AppHeader from '../../components/app-header/app-header';

import OrdertDetail from '../../components/order-detail/order-detail';

export function OrderDetailPage() {
    
    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <OrdertDetail />
            </div>
        </main>
    )
}