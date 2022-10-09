import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import AppHeader from "../components/app-header/app-header";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassRequest } from '../components/api/api';



export const ForgotPassPage = () => {
    const history = useHistory();
    const [inputEmailValue, setInputEmailValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassRequest(inputEmailValue)
        .then(res => history.replace({ pathname: '/reset-password' }))
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