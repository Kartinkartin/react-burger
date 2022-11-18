import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUserRequest } from '../../components/api/api';
import { useForm } from '../../services/hooks/useForm';

export const RegistrationPage = () => {
    const {values, handleChange} = useForm({});
    const [passIcon, setPassIcon] = useState('ShowIcon');

    const onIconClick = () => {
        passIcon === 'ShowIcon' ? setPassIcon('HideIcon') : setPassIcon('ShowIcon')
    };
    const handleRegister = (e: any) => {
        e.preventDefault();
        registerUserRequest(values);
    }

    return (
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
                            name={'name'}
                            type={'text'}
                            placeholder={'Name'}
                            size={'default'}
                            value={values.name || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`${styles.input_container} pb-6`}>
                        <Input
                            name={'email'}
                            type={'email'}
                            placeholder={'E-mail'}
                            size={'default'}
                            value={values.email || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`${styles.input_container} pb-6`}>
                        <Input
                            name={'password'}
                            type={'password'}
                            placeholder={'Пароль'}
                            size={'default'}
                            value={values.password || ''}
                            onChange={handleChange}
                            icon={"ShowIcon"}
                            onIconClick={onIconClick}
                        />
                    </div>
                    <Button
                        type="primary"
                        size="medium"
                        disabled={!values.name && !values.email && !values.password}
                        htmlType='submit'>
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
    )
}
