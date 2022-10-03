import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import AppHeader from "../components/app-header/app-header";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPass } from '../services/actions';
import { FORGOT_PASSWORD } from '../services/actions/login';



export const RecoveryPassPage = () => {
    const dispatch = useDispatch();
    const [inputEmailValue, setInputEmailValue] = useState('');
    const onClick = (e) => {
        // e.PreventDefault();
        dispatch({
            type: FORGOT_PASSWORD
        })
    }

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
                            onClick={onClick} >
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