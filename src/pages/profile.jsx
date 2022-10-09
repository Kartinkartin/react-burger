import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import AppHeader from "../components/app-header/app-header";
import FormProfile from '../components/form-profile/form-profile';
import ProfileNavigator from '../components/profile-navigator/profile-navigator';
import { getUserRequest } from '../components/api/api';
import { refreshUser } from '../services/actions';

export const ProfilePage = () => {
    const password = useSelector(store => store.login.password);
    const isLogin = document.cookie ? true : false;
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.login.token);
    const history = useHistory();
    const [user, setUser] = useState(null); // заполняется именем/почтой по ответу сервера, пароль из store добавится при передаче пропсов
    let data = null;
    const refreshToken = document.cookie.includes('refreshToken') ? document.cookie.split('=')[1] : null;
    useEffect(() => {
        getUserRequest(accessToken)
            .then(res => {
                data = res.user;
                if(data) setUser(data)
            })
        .catch(err => {
            isLogin ? 
            dispatch(refreshUser(refreshToken)) : // перезаписываю accessToken в store
            history.replace({ pathname: '/login' })
        })
    }, [data, accessToken])
    
    
    return (
        <main className={styles.page}>
            <AppHeader />
            {user && 
            (<div className={styles.main}>
                <ProfileNavigator />
                <FormProfile userData={ {...user, pass: password} } />
            </div>)}
        </main>
    )
}