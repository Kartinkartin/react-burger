import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './orders.module.css';
import { ProfileNavigator } from '../../components/profile-navigator/profile-navigator';
import { getCookie } from '../../services/utils/cookie';
import { OrdersList } from '../../components/orders-list/orders-list';
import { getAccessToken, getWSOrders } from '../../services/selectors/selectors';
import { disconnectWs, startWsProtectedRoute } from '../../services/websocket/actions';
import { performActionWithRefreshedToken } from '../../services/actions';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

export const OrdersPage = () => {
    const history = useHistory();
    const location = useLocation();
    const isLogin = document.cookie.includes('refreshToken');
    const dispatch = useDispatch();
    const accessToken = useSelector(getAccessToken);
    const refreshToken = document.cookie.includes('refreshToken') ?
        getCookie('refreshToken') : '';
    const myOrders = useSelector(getWSOrders);

    useEffect(() => {
        if (!isLogin) history.replace({ pathname: '/login', state: { from: location.pathname } })
        dispatch(performActionWithRefreshedToken(accessToken, startWsProtectedRoute,))
        return (() => {
            dispatch(disconnectWs()) // socket.close()
        })
}, [dispatch, isLogin, history, location, accessToken])


return (
    <>
        {accessToken &&
            (<div className={styles.main}>
                <ProfileNavigator refreshToken={refreshToken} />
                <OrdersList width={'860px'} orders={myOrders} />
            </div>)}
    </>
)
}
