import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './profile.module.css';
import AppHeader from "../../components/app-header/app-header";
import FormProfile from '../../components/form-profile/form-profile';
import ProfileNavigator from '../../components/profile-navigator/profile-navigator';
import { getUserRequest } from '../../components/api/api';
import { refreshUser } from '../../services/actions';
import { getCookie } from '../../services/utils/cookie'; 

export const ProfilePage = () => {
    const history = useHistory();
    const location = useLocation();
    const isLogin = document.cookie.includes('refreshToken');
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.login.token);
    const refreshToken = document.cookie.includes('refreshToken') ? getCookie('refreshToken') : '';

    const [user, setUser] = useState(null); // заполняется именем/почтой по ответу сервера, пароль пустая строка
    let data = useRef();
    data.current = null;

    useEffect(() => {
        getUserRequest(accessToken)
            .then(res => {
                data.current = res.user;
                if(data.current) setUser(data.current)
            })
        .catch(err => {
            isLogin ? 
            dispatch(refreshUser(refreshToken)) : // перезаписываю accessToken в store
            history.replace({ pathname: '/login', state: { from: location.pathname } })
        })
    }, [data, accessToken, dispatch, history, location, isLogin, refreshToken])
    
    
    return (
        <main className={styles.page}>
            <AppHeader />
            {user && 
            (<div className={styles.main}>
                <ProfileNavigator refreshToken={refreshToken} />
                <FormProfile userData={ { ...user } }  />
                <></>
            </div>)}
        </main>
    )
}