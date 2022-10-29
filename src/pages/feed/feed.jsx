import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feed.module.css';
import OrdersList from '../../components/orders-list/orders-list';
import OrderStatistics from '../../components/order-statistics/order-statistics';
import { getWSOrders } from '../../services/selectors/selectors';
import { WS_CONNECTION_DISCONNECT, WS_CONNECTION_START } from '../../services/websocket/actions/wsActionTypes';

export function FeedPage() {
    const dispatch = useDispatch();
    const data = useSelector(getWSOrders);
    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START
        })
        return(() => {
            dispatch({
                type: WS_CONNECTION_DISCONNECT
            }) // socket.close()
        })
    }, [dispatch])
    return (
        <div className={styles.main}>
            <h1 className={`${styles.title} text text_type_main-large pb-5`}>
                Лента заказов
            </h1>
            {data.length ?
                (<>
                    <div className={styles.list} >
                        <OrdersList width={'610px'} orders={data} />
                    </div>
                    <div className={styles.statistics} >
                        <OrderStatistics />
                    </div>
                </>) :
                null
            }
        </div>
    )
}
