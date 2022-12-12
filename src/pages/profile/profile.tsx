import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './profile.module.css';
import { FormProfile } from '../../components/form-profile/form-profile';
import { ProfileNavigator } from '../../components/profile-navigator/profile-navigator';
import { getUserRequest } from '../../components/api/api';
import { refreshUser } from '../../services/actions';
import { getCookie } from '../../services/utils/cookie'; 
import { getAccessToken } from '../../services/selectors/selectors';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { TChangeUserData, TLoginData } from '../../services/types';
import { TUser, TUserResponse } from '../../services/types/data';

export const ProfilePage = () => {
    const history = useHistory();
    const location = useLocation();
    const isLogin = document.cookie.includes('refreshToken');
    const dispatch = useDispatch();
    const accessToken = useSelector(getAccessToken);
    const refreshToken = document.cookie.includes('refreshToken') ? getCookie('refreshToken') : '';

    // заполняется именем/почтой по ответу сервера, пароль пустая строка
    const [user, setUser] = useState<TUser | null>(null); 
    let data = useRef<TUser | null>(null);

    useEffect(() => {
        getUserRequest(accessToken)
            .then(res => {
                data.current = res.user;
                if(data.current) setUser(data.current)
            })
        .catch(err => {
            dispatch(refreshUser(refreshToken))
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
