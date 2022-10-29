import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './order-detail.module.css';
import OrdertDetail from '../../components/order-detail/order-detail';
import { performActionWithRefreshedToken } from '../../services/actions';
import { startWsProtectedRoute } from '../../services/websocket/actions';
import { getAccessToken } from '../../services/selectors/selectors';
import { WS_CONNECTION_DISCONNECT, WS_CONNECTION_START } from '../../services/websocket/actions/wsActionTypes';

export function OrderDetailPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const accessToken = useSelector(getAccessToken);
    useEffect(() => {
        if (location.pathname.includes('/feed')) { 
            dispatch({
                type: WS_CONNECTION_START
            })
        }
        if (location.pathname.includes('/profile/orders')) { 
            dispatch(performActionWithRefreshedToken(accessToken, startWsProtectedRoute, ))
        }
        return (()=> {
            dispatch({
                type: WS_CONNECTION_DISCONNECT
            })
        })
    }, [dispatch, accessToken, location]);
    return (
        <div className={styles.main}>
            <OrdertDetail />
        </div>
    )
}
