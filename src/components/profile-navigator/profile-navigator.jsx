import React from 'react';
import { useLocation, useRouteMatch, NavLink } from 'react-router-dom';
import styles from './profile-navigator.module.css';

export default function ProfileNavigator() {
    const match = useRouteMatch();
    debugger
    return (
        <nav className={`${styles.nav_container} mr-6`}>
            <NavLink
                to="/profile"
                className={
                    ({ isActive }) => {   
                        debugger
                        return `${styles.link_active} text text_type_main-medium`} }
                 >
                Профиль
            </NavLink>
            <NavLink to='/' className={`${styles.link} text text_type_main-medium`}>История заказов</NavLink>
            <NavLink to='/' className={`${styles.link} text text_type_main-medium`}>Выход</NavLink>
        </nav>
    )
}