import React, { useState, FormEvent, FunctionComponent } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import styles from './resetPass.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { newPassRequest } from '../../components/api/api';
import { useForm } from '../../services/hooks/useForm'; 
import { TLocationState } from '../../services/types';


export const ResetPassPage: FunctionComponent = () => {
    const history = useHistory();
    const location = useLocation<TLocationState>();
    const {values, handleChange } = useForm({});
    const [passIcon, setPassIcon] = useState('ShowIcon');

    const onIconClick = () => {
        passIcon === 'ShowIcon' ? setPassIcon('HideIcon') : setPassIcon('ShowIcon')
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newPassRequest(values)
            .then(res => history.replace({ pathname: '/login' }))
    }

    // проверка адреса предыдущей страницы, если ResetPassPage открыта не с ForgotPassPage, то переадресует на ForgotPassPage
    if (location.state?.from?.pathname === '/forgot-password') {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={`${styles.header} text text_type_main-medium`}>
                        Восстановление пароля
                    </h1>
                    <form
                        className={`${styles.form_container} pt-6 pb-20`}
                        onSubmit={handleSubmit} >
                        <div className={`${styles.input_container} pb-6`}>
                            <Input
                                name={'password'}
                                type={'password'}
                                placeholder={'Введите новый пароль'}
                                size={'default'}
                                value={values.password || ''}
                                onChange={handleChange}
                                icon={'ShowIcon'}
                                onIconClick={onIconClick}
                            />
                        </div>
                        <div className={`${styles.input_container} pb-6`}>
                            <Input
                                name={'token'}
                                type={'text'}
                                placeholder={'Введите код из письма'}
                                size={'default'}
                                value={values.token || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            type="primary"
                            size="medium"
                            disabled={!values.password || !values.code}
                            htmlType='submit'>
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
        );
    }

    return (
        <Redirect to='/forgot-password' />
    )
}
