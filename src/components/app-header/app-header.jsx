import React from "react";
import styles from "../app-header/app-header.module.css";
import { Link } from "react-router-dom";
import {
    ListIcon,
    Logo,
    ProfileIcon,
    BurgerIcon,
    Box,
    Typography
} from '@ya.praktikum/react-developer-burger-ui-components';


export default function AppHeader() {
    return (
        <header className={`${styles.header} p-4`}>
            <div className={`${styles.button} pr-10`}>
                <BurgerIcon />
                <p className="text text_type_main-default ml-2">Конструктор</p>
            </div>
            <div className={`${styles.button} pr-5 ml-2`}>
                <ListIcon />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <Link className={styles.button} to='/profile'>
                <ProfileIcon />
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </Link>
        </header>
    )
}