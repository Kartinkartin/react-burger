import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './order-detail.module.css';
import { OrdertDetail } from '../../components/order-detail/order-detail';
import { performActionWithRefreshedToken } from '../../services/actions';
import { disconnectWs, startWs, startWsProtectedRoute } from '../../services/websocket/actions';
import { getAccessToken } from '../../services/selectors/selectors';
import { AppDispatch } from '../../services/types';

export const OrderDetailPage: FunctionComponent = () => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const accessToken = useSelector(getAccessToken);
    useEffect(() => {
        if (location.pathname.includes('/feed')) { 
            startWs()(dispatch)
        }
        if (location.pathname.includes('/profile/orders')) { 
            performActionWithRefreshedToken(accessToken, startWsProtectedRoute, )(dispatch)
        }
        return (()=> {
            disconnectWs()(dispatch)
        })
    }, [dispatch, accessToken, location]);
    return (
        <div className={styles.main}>
            <OrdertDetail />
        </div>
    )
}
