import React, { useEffect } from 'react';
import styles from './feed.module.css';
import { OrdersList } from '../../components/orders-list/orders-list';
import { OrderStatistics } from '../../components/order-statistics/order-statistics';
import { getWSOrders } from '../../services/selectors/selectors';
import { disconnectWs, startWs } from '../../services/websocket/actions';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

export const FeedPage = () => {
    const dispatch = useDispatch();
    const data = useSelector(getWSOrders);
    useEffect(() => {
        dispatch(startWs())
        return(() => {
            dispatch(disconnectWs()) // socket.close()
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
