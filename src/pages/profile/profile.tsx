import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './profile.module.css';
import { FormProfile } from '../../components/form-profile/form-profile';
import { ProfileNavigator } from '../../components/profile-navigator/profile-navigator';
import { getUserRequest } from '../../components/api/api';
import { refreshUser } from '../../services/actions';
import { getCookie } from '../../services/utils/cookie'; 
import { getAccessToken } from '../../services/selectors/selectors';
import { AppDispatch } from '../../services/types';

export const ProfilePage: FunctionComponent = () => {
    const history = useHistory();
    const location = useLocation();
    const isLogin = document.cookie.includes('refreshToken');
    const dispatch: AppDispatch = useDispatch();
    const accessToken = useSelector(getAccessToken);
    const refreshToken = document.cookie.includes('refreshToken') ? getCookie('refreshToken') : '';

    const [user, setUser] = useState(null); // заполняется именем/почтой по ответу сервера, пароль пустая строка
    let data = useRef();

    useEffect(() => {
        getUserRequest(accessToken)
            .then(res => {
                data.current = res.user;
                if(data.current) setUser(data.current)
            })
        .catch(err => {
            refreshUser(refreshToken)(dispatch)
        })
    }, [data, accessToken, dispatch, history, location, isLogin, refreshToken])
    
    
    return (
        <>
            { user && 
            (<div className={styles.main}>
                <ProfileNavigator refreshToken={ refreshToken } />
                <FormProfile userData={ user }  />
            </div>)
            }
        </>
    )
}
