import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './resetPass.module.css';
import AppHeader from "../components/app-header/app-header";
import { Input, Button, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const ResetPassPage = () => {
    const [inputPassValue, setInputPassValue] = useState('');
    const [passIcon, setPassIcon] = useState('ShowIcon');
    const [inputCodeValue, setInputCodeValue] = useState('');

    const onIconClick=()=> {
        passIcon === 'ShowIcon' ? setPassIcon('HideIcon') : setPassIcon('ShowIcon')
    } ;

    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={`${styles.header} text text_type_main-medium`}>
                        Восстановление пароля
                    </h1>
                    <form className={`${styles.form_container} pt-6 pb-20`}>
                        <div className={`${styles.input_container} pb-6`}>
                            <Input
                                name={'pass-input'}
                                type={'password'}
                                placeholder={'Введите новый пароль'}
                                size={'default'}
                                value={inputPassValue}
                                onChange={e => setInputPassValue(e.target.value)}
                                icon={passIcon}
                                onIconClick={onIconClick}
                            />
                        </div>
                        <div className={`${styles.input_container} pb-6`}>
                            <Input
                                name={'code-input'}
                                type={'text'}
                                placeholder={'Введите код из письма'}
                                size={'default'}
                                value={inputCodeValue}
                                onChange={e => setInputCodeValue(e.target.value)}
                            />
                        </div>
                        <Button type="primary" size="medium" disabled={ !inputPassValue && !inputCodeValue }>
                            Войти
                        </Button>
                    </form>
                    <p className={`${styles.text} text text_type_main-default pb-4`}>
                        Вспомнили пароль? <Link className={styles.link} to='/login'>
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}