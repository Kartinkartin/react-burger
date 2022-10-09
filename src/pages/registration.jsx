import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';
import AppHeader from "../components/app-header/app-header";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUserRequest } from '../components/api/api';

export const RegistrationPage = () => {
    const [inputNameValue, setInputNameValue] = useState('');
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [inputPassValue, setInputPassValue] = useState('');
    const newUserData = {
        email: '',
        password: '',
        name: ''
    };

    const [passIcon, setPassIcon] = useState('ShowIcon')
    const onIconClick = () => {
        passIcon === 'ShowIcon' ? setPassIcon('HideIcon') : setPassIcon('ShowIcon')
    };

    const handleRegister = (e) => {
        e.preventDefault();
        newUserData.email = inputEmailValue;
        newUserData.password = inputPassValue;
        newUserData.name = inputNameValue;
        registerUserRequest(newUserData);

    }

    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={`${styles.header} text text_type_main-medium`}>
                        Регистрация
                    </h1>
                    <form
                        className={`${styles.form_container} pt-6 pb-20`}
                        onSubmit={handleRegister} >
                        <div className={`${styles.input_container} pb-6`}>
                            <Input
                                name={'name-input'}
                                type={'text'}
                                placeholder={'Name'}
                                size={'default'}
                                value={inputNameValue}
                                onChange={e => setInputNameValue(e.target.value)}
                            />
                        </div>
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
                        <Button
                            type="primary"
                            size="medium"
                            disabled={!inputNameValue && !inputEmailValue && !inputPassValue} >
                            Зарегистрироваться
                        </Button>
                    </form>
                    <p className={`${styles.text} text text_type_main-default pb-4`}>
                        Уже зарегистрированы? <Link className={styles.link} to='/login'>
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}