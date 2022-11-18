import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/actions';
import styles from './profile-navigator.module.css';

type TNavigatorProps = {
    refreshToken: string
}
export const ProfileNavigator: FunctionComponent<TNavigatorProps> = ({ refreshToken }: TNavigatorProps) => {
    const dispatch: any = useDispatch();
    const history = useHistory();
    const onLogoutClick = () => {
        dispatch(logoutUser(refreshToken, history))
    }
    return (
        <nav className={`${styles.nav_container} mr-6`}>
            <NavLink
                to='/profile'
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.link_active}
                exact={true}
            >
                Профиль
            </NavLink>
            <NavLink
                to='/profile/orders'
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.link_active}
                exact={true} >
                История заказов
            </NavLink>
            <button
                className={`${styles.button} text text_type_main-medium`}
                type='button'
                onClick={onLogoutClick} >
                Выход
            </button>
            <p className={`${styles.text} text text_type_main-default pt-20`} >
                {history.location.pathname === '/profile' ?
                <>В этом разделе вы можете изменить свои персональные данные </> :
                <>В этом разделе вы можете просмотреть свою историю заказов</> }
            </p>
        </nav>
    )
}
