import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/actions';
import styles from './profile-navigator.module.css';

export default function ProfileNavigator() {
    const dispatch = useDispatch();
    const history = useHistory();
    const refreshToken = document.cookie.split('; ')[0].split('=')[1]
    const onClick = () => {
        dispatch(logoutUser(refreshToken, history))
    }
    return (
        <nav className={`${styles.nav_container} mr-6`}>
            <NavLink
                to={{ pathname: '/profile' }}
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.link_active}
            >
                Профиль
            </NavLink>
            <NavLink
                to={{ pathname: '/profile/orders' }}
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.link_active}>
                История заказов
            </NavLink>
            <button
                className={`${styles.button} text text_type_main-medium`}
                type='button'
                onClick={onClick} >
                Выход
            </button>
        </nav>
    )
}