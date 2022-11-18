import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './order-detail.module.css';
import { OrdertDetail } from '../../components/order-detail/order-detail';
import { performActionWithRefreshedToken } from '../../services/actions';
import { disconnectWs, startWs, startWsProtectedRoute } from '../../services/websocket/actions';
import { getAccessToken } from '../../services/selectors/selectors';

export const OrderDetailPage: FunctionComponent = () => {
    const dispatch: any = useDispatch();
    const location = useLocation();
    const accessToken = useSelector(getAccessToken);
    useEffect(() => {
        if (location.pathname.includes('/feed')) { 
            dispatch(startWs())
        }
        if (location.pathname.includes('/profile/orders')) { 
            dispatch(performActionWithRefreshedToken(accessToken, startWsProtectedRoute, ))
        }
        return (()=> {
            dispatch(disconnectWs())
        })
    }, [dispatch, accessToken, location]);
    return (
        <div className={styles.main}>
            <OrdertDetail />
        </div>
    )
}
