import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import AppHeader from "../components/app-header/app-header";
import { Input, Button, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const LoginPage = () => {
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [inputPassValue, setInputPassValue] = useState('');
    const [passIcon, setPassIcon] = useState('ShowIcon')
    const onIconClick=()=> {
        passIcon === 'ShowIcon' ? setPassIcon('HideIcon') : setPassIcon('ShowIcon')
    } ;

    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={`${styles.header} text text_type_main-medium`}>
                        Вход
                    </h1>
                    <div className={`${styles.form_container} pt-6 pb-20`}>
                        <div className={`${styles.input_container} pb-6`}>
                            <Input
                                name={'email-input'}
                                type={'email'}
                                placeholder={'E-mail'}
                                size={'default'}
                                value={inputEmailValue}
                                onChange={e => setInputEmailValue(e.target.value)}
                            />
                        </div>
                        <div className={`${styles.input_container} pb-6`}>
                            <Input
                                name={'pass-input'}
                                type={'password'}
                                placeholder={'Пароль'}
                                size={'default'}
                                value={inputPassValue}
                                onChange={e => setInputPassValue(e.target.value)}
                                icon={passIcon}
                                onIconClick={onIconClick}
                            />
                        </div>
                        <Button type="primary" size="medium" disabled={!inputEmailValue && !inputPassValue}>
                            Войти
                        </Button>
                    </div>
                    <p className={`${styles.text} text text_type_main-default pb-4`}>
                        Вы новый пользователь? <Link className={styles.link} to='/register'>
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className={`${styles.text} text text_type_main-default`}>
                        Забыли пароль? <Link className={styles.link} to='/forgot-password'>
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}