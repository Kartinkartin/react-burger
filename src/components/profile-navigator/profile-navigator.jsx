import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../services/actions';
import styles from './profile-navigator.module.css';

export default function ProfileNavigator({ refreshToken }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const onClick = async () => {
        await dispatch(logoutUser(refreshToken, history))
        // await чтобы не рисовался профиль и не ругалась типизация уже сброшенного refreshToken
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
            <p className={`${styles.text} text text_type_main-default pt-20`} >
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </nav>
    )
}

ProfileNavigator.propTypes = {
    refreshToken: PropTypes.string.isRequired,
}