import React from 'react';
import styles from './order-detail.module.css';
import OrdertDetail from '../../components/order-detail/order-detail';

export function OrderDetailPage() {

    return (
        <div className={styles.main}>
            <OrdertDetail />
        </div>
    )
}
