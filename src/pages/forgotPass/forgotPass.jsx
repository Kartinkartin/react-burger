import React, { useState } from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import styles from './forgotPass.module.css';
import AppHeader from "../../components/app-header/app-header";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassRequest } from '../../components/api/api';



export const ForgotPassPage = () => {
    const location = useLocation();
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [wasReset, setReset] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        return resetPassRequest(inputEmailValue)
            .then(res =>
                setReset(true)
            )
    }

    if (wasReset) {
        return(
            <Redirect to={{ pathname: '/reset-password', state: {from: location} }} />
        )
    }

    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={`${styles.header} text text_type_main-medium`}>
                        Восстановление пароля
                    </h1>
                    <form
                        className={`${styles.form_container} pt-6 pb-20`}
                        onSubmit={handleSubmit}>
                        <div className={`${styles.input_container} pb-6`}>
                            <Input
                                name={'email-input'}
                                type={'email'}
                                placeholder={'Укажите e-mail'}
                                size={'default'}
                                value={inputEmailValue}
                                onChange={e => setInputEmailValue(e.target.value)}
                            />
                        </div>
                        <Button
                            type="primary"
                            size="medium"
                            disabled={!inputEmailValue}
                            htmlType='submit' >
                            Восстановить
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