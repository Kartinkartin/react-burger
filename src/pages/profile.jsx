import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import AppHeader from "../components/app-header/app-header";
import FormProfile from '../components/form-profile/form-profile';
import ProfileNavigator from '../components/profile-navigator/profile-navigator';
import { getUserRequest, refreshTokenRequest } from '../components/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER } from '../services/actions/login';
import { refreshUser } from '../services/actions';

export const ProfilePage = () => {
    const password = useSelector(store => store.login.password);
    const isLogin = password ? true : false;
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.login.token);
    const history = useHistory();
    const [user, setUser] = useState(null);
    let data = null;
    const refreshToken = document.cookie.includes('refreshToken') ? document.cookie.split('=')[1] : null;
    useEffect(() => {
        debugger
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
        debugger
    }, [data])
    
    
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