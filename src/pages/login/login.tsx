import React, { FormEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../services/actions';
import { useDispatch, useForm } from '../../services/hooks/hooks';


export const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {values, handleChange} = useForm({});
    const loginData = {
        "email": "",
        "password": ""
    };

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginData.email = values.email;
        loginData.password = values.password;
        dispatch(loginUser(values, history));
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={`${styles.header} text text_type_main-medium`}>
                        Вход
                    </h1>
                    <form
                        className={`${styles.form_container} pt-6 pb-20`}
                        onSubmit={handleLogin}>
                        <div className={`${styles.input_container} pb-6`}>
                            <EmailInput
                                name={'email'}
                                placeholder={'E-mail'}
                                size={'default'}
                                value={values.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={`${styles.input_container} pb-6`}>
                            <PasswordInput
                                name={'password'}
                                placeholder={'Пароль'}
                                size={'default'}
                                value={values.password || ''}
                                onChange={handleChange}
                                icon={"HideIcon"}
                            />
                        </div>
                        <Button
                            type="primary"
                            size="medium"
                            disabled={!values.email || !values.password}
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
        </>
    );
}
