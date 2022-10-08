import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styles from './login.module.css';
import AppHeader from "../components/app-header/app-header";
import { Input, EmailInput, PasswordInput, Button, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../services/actions';


export const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [inputPassValue, setInputPassValue] = useState('');
    const [passIcon, setPassIcon] = useState('ShowIcon');
    const loginData = {
        "email": "", 
        "password": "" 
    };

    const onIconClick = () => {
        passIcon === 'ShowIcon' ? setPassIcon('HideIcon') : setPassIcon('ShowIcon')
    };

    const handleLogin = (e) => {
        e.preventDefault();
        loginData.email = inputEmailValue;
        loginData.password = inputPassValue;
        dispatch(loginUser(loginData, history));
    }
    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={`${styles.header} text text_type_main-medium`}>
                        Вход
                    </h1>
                    <form className={`${styles.form_container} pt-6 pb-20`} onSubmit={handleLogin}>
                        <div className={`${styles.input_container} pb-6`}>
                            <EmailInput
                                name={'email-input'}
                                type={'email'}
                                placeholder={'E-mail'}
                                size={'default'}
                                value={inputEmailValue}
                                onChange={e => setInputEmailValue(e.target.value)}
                            />
                        </div>
                        <div className={`${styles.input_container} pb-6`}>
                            <PasswordInput
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
                        <Button
                            type="primary"
                            size="medium"
                            disabled={!inputEmailValue || !inputPassValue}
                            htmlType="submit" >
                            Войти
                        </Button>
                    </form>
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