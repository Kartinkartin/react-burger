import React, { useState, FormEvent, FunctionComponent } from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import styles from './forgotPass.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassRequest } from '../../components/api/api';
import { useForm } from '../../services/hooks/useForm';

export const ForgotPassPage: FunctionComponent = () => {
    const location = useLocation();
    const {values, handleChange} = useForm({});
    const [wasReset, setReset] = useState(false);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return resetPassRequest(values.email)
            .then(res =>
                setReset(true)
            )
    }

    if (wasReset) {
        return (
            <Redirect to={{ pathname: '/reset-password', state: { from: location } }} />
        )
    }

    return (

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
                            name={'email'}
                            type={'email'}
                            placeholder={'Укажите e-mail'}
                            size={'default'}
                            value={values.email || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        type="primary"
                        size="medium"
                        disabled={!values.email}
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
    );
}
