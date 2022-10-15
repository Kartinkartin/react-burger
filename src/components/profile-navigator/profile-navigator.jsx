import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../services/actions';
import styles from './profile-navigator.module.css';

export default function ProfileNavigator({ refreshToken }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const onLogoutClick = async () => {
        await dispatch(logoutUser(refreshToken, history))
        // await чтобы не пытался рисоваться профиль
    }
    return (
        <nav className={`${styles.nav_container} mr-6`}>
            <NavLink
                to='/profile'
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.link_active}
            >
                Профиль
            </NavLink>
            <NavLink
                to='/profile/orders'
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.link_active}>
                История заказов
            </NavLink>
            <button
                className={`${styles.button} text text_type_main-medium`}
                type='button'
                onClick={onLogoutClick} >
                Выход
            </button>
            <p className={`${styles.text} text text_type_main-default pt-20`} >
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </nav>
    )
}

ProfileNavigator.propTypes = {
    refreshToken: PropTypes.string.isRequired,
}