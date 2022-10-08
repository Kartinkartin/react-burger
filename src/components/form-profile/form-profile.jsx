import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { EmailInput, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-profile.module.css';
import { changeUserDataRequest } from '../api/api';


export default function FormProfile({ userData }) {
    debugger
    const [inputNameValue, setInputNameValue] = useState(userData.name);
    const [inputEmailValue, setInputEmailValue] = useState(userData.email);
    const [inputPassValue, setInputPassValue] = useState(userData.pass);
    const newData={};
    const token = useSelector(store => store.login.token)

    const onSave = () => {
        if (
            inputNameValue !== userData.name || 
            inputEmailValue !== userData.email ||
            inputPassValue !== userData.pass) {
                changeUserDataRequest(token, newData)
            }
    }

     const onIconClick = () => { };
    debugger
    return (
        <div className={`${styles.form_container}`}>
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
                <Button type="primary" size="medium" >Отменить</Button>
                <Button type="primary" size="medium" onClick={onSave}>Сохранить</Button>
            </div>
        </div>
    )
}