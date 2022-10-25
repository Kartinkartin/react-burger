import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './orders.module.css';
import AppHeader from "../../components/app-header/app-header";
import ProfileNavigator from '../../components/profile-navigator/profile-navigator';
import { getUserRequest } from '../../components/api/api';
import { handlePerformeAction, performActionWithRefreshedToken, refreshUser } from '../../services/actions';
import { getCookie } from '../../services/utils/cookie';
import OrdersList from '../../components/orders-list/orders-list';
import { getWSOrders } from '../../services/selectors/selectors';
import { startWsProtectedRoute } from '../../services/websocket/actions';

export const OrdersPage = () => {
    const history = useHistory();
    const location = useLocation();
    const isLogin = document.cookie.includes('refreshToken');
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.login.token);
    const refreshToken = document.cookie.includes('refreshToken') ?
        getCookie('refreshToken') : '';
    const myOrders = useSelector(getWSOrders);

    useEffect(() => { // тут половину выкинуть
        if(!isLogin)  history.replace({ pathname: '/login', state: { from: location.pathname } })
        dispatch(performActionWithRefreshedToken(accessToken, startWsProtectedRoute, ))
    }, [dispatch, isLogin])


    return (
        <main className={styles.page}>
            <AppHeader />
            {accessToken &&
                (<div className={styles.main}>
                    <ProfileNavigator refreshToken={refreshToken} />
                    <OrdersList width={'860px'} orders={myOrders} />
                </div>)}
        </main>
    )
}