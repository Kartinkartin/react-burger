import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import AppHeader from "../components/app-header/app-header";
import FormProfile from '../components/form-profile/form-profile';
import ProfileNavigator from '../components/profile-navigator/profile-navigator';
import { getUserRequest } from '../components/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER } from '../services/actions/login';

export const ProfilePage = () => {
    const password = useSelector(store => store.login.password);
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.login.token);
    const history = useHistory();
    const [user, setUser] = useState(null);
    let data = null;
    const token = document.cookie.includes('refreshToken') ? document.cookie.split('=')[1] : null;
    useEffect(() => {
        debugger
        getUserRequest(accessToken)
            .then(res => {
                data = res.user;
            })
            .then(
                
            )
        .catch(err => history.replace({ pathname: '/login' }))
        debugger
    }, [data])

    // setUser(data)
    
    
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