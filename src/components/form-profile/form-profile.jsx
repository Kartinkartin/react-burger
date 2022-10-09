import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-profile.module.css';
import { changeUserData } from '../../services/actions';


export default function FormProfile({ userData }) {
    const dispatch = useDispatch();
    const [inputNameValue, setInputNameValue] = useState(userData.name);
    const [inputEmailValue, setInputEmailValue] = useState(userData.email);
    const [inputPassValue, setInputPassValue] = useState(userData.pass);
    const newData = {};
    const token = useSelector(store => store.login.token)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputNameValue !== userData.name) { newData.name = inputNameValue }
        if (inputEmailValue !== userData.email) { newData.email = inputEmailValue }
        if (inputPassValue !== userData.pass) { newData.password = inputPassValue }
        for ( let key in newData) {
            dispatch(changeUserData(token, newData));
            break
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        setInputNameValue(userData.name);
        setInputEmailValue(userData.email);
        setInputPassValue(userData.pass);
    }

    const onIconClick = () => { };
    return (
        <form
            className={`${styles.form_container}`}
            onSubmit={handleSubmit} >
            <div className={`${styles.input_container} pb-6`}>
                <Input
                    name={'name-input'}
                    type={'text'}
                    placeholder={'Name'}
                    size={'default'}
                    value={inputNameValue}
                    onChange={e => setInputNameValue(e.target.value)}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={`${styles.input_container} pb-6`}>
                <EmailInput
                    name={'email-input'}
                    size={'default'}
                    value={inputEmailValue}
                    onChange={e => setInputEmailValue(e.target.value)}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={`${styles.input_container} pb-6`}>
                <Input
                    name={'pass-input'}
                    type={'text'}
                    placeholder={'Пароль'}
                    size={'default'}
                    value={inputPassValue}
                    onChange={e => setInputPassValue(e.target.value)}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={styles.button_container}>
                <Button type="primary" size="medium" onClick={handleReset} htmlType='reset' >Отменить</Button>
                <Button type="primary" size="medium" htmlType='submit'>Сохранить</Button>
            </div>
        </form>
    )
}