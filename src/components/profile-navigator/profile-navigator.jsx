import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile-navigator.module.css';

export default function ProfileNavigator() {
    return (
        <nav className={`${styles.nav_container} mr-6`}>
            <NavLink to='/profile' className={`${styles.link} ${styles.current_page} text text_type_main-medium`}>Профиль</NavLink>
            <NavLink to='/' className={`${styles.link} text text_type_main-medium`}>История заказов</NavLink>
            <NavLink to='/' className={`${styles.link} text text_type_main-medium`}>Выход</NavLink>
        </nav>
    )
}