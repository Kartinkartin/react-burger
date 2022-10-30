import React from "react";
import styles from "../app-header/app-header.module.css";
import { NavLink } from "react-router-dom";
import {
    ListIcon,
    Logo,
    ProfileIcon,
    BurgerIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


export default function AppHeader() {
    return (
        <header className={`${styles.header} p-4`}>
            <NavLink
                className={`${styles.button} pr-10`}
                activeClassName={styles.active}
                to='/'
                exact={true}>
                <BurgerIcon />
                <p className="text text_type_main-default ml-2">Конструктор</p>
            </NavLink>
            <NavLink
                className={`${styles.button} pr-5 ml-2`}
                activeClassName={styles.active}
                to='/feed' >
                <ListIcon />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
            </NavLink>
            <NavLink className={styles.logo} to='/'>
                <Logo />
            </NavLink>
            <NavLink
                className={styles.button}
                activeClassName={styles.active}
                to='/profile' >
                <ProfileIcon />
                <p className="text text_type_main-default ml-2">
                    Личный кабинет
                </p>
            </NavLink>
        </header>
    )
}
