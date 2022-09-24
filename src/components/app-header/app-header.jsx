import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "../app-header/app-header.module.css";
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';


export default function AppHeader() {
    return (
        <header className={`${styles.header} p-4`}>
            <div className={`${styles.button} pl-5 pr-5`}>
                <BurgerIcon />
                <p className="text text_type_main-default ml-2">Конструктор</p>
            </div>
            <div className={`${styles.button} pl-5 pr-5 ml-2`}>
                <ListIcon />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={`${styles.button} pl-5 pr-5`}>
                <ProfileIcon />
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </div>
        </header>
    )
}