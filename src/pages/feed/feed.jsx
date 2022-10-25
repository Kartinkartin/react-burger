import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feed.module.css';
import AppHeader from '../../components/app-header/app-header';
import OrdersList from '../../components/orders-list/orders-list';
import OrderStatistics from '../../components/order-statistics/order-statistics';
import { WS_CONNECTION_START, WS_GET_MESSAGE } from '../../services/websocket/actions/wsActionTypes';
import { getTodayDone, getTotalDone, getWSOrders } from '../../services/selectors/selectors';

export function FeedPage() {
    const dispatch = useDispatch();
    const data = useSelector(getWSOrders);

    // useEffect(() => {
    //     dispatch({
    //         type: 'WS_CONNECTION_START'
    //     })
    // }, [dispatch])

    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <h1 className={`${styles.title} text text_type_main-large pb-5`}>
                    Лента заказов
                </h1>
                { data.length ?
                    (<>
                        <div className={styles.list} >
                            <OrdersList width={'610px'} orders={data}/>
                        </div>
                        <div className={styles.statistics} >
                            <OrderStatistics />
                        </div>
                    </>) :
                    null
                }

            </div>
        </main>
    )
}