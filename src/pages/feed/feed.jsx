import React, { useEffect, useState, useMemo } from 'react';
import styles from './feed.module.css';
import AppHeader from '../../components/app-header/app-header';
import OrdersList from '../../components/orders-list/orders-list';
import { OrderStatistics } from '../../components/order-statistics/order-statistics';

const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
export function FeedPage() {
    const [data, setData] = useState(null);
    ws.onmessage = (e) => {
        const data = JSON.parse(e.data)
        if (data.success) setData(data)
    }

    const list = useMemo(()=>{
        if (data) return data.orders
    }, [data])

    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <h1 className={`${styles.title} text text_type_main-large pb-5`}>
                    Лента заказов
                </h1>
                { list ?
                    (<>
                        <div className={styles.list} >
                            <OrdersList width={'610px'} orders={ list } />
                        </div>
                        <div className={styles.statistics} >
                            <OrderStatistics data={data} />
                        </div>
                    </>) :
                    null
                }

            </div>
        </main>
    )
}