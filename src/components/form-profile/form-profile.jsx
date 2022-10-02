import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-profile.module.css';

export default function FormProfile() {
    const [inputNameValue, setInputNameValue] = useState('');
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [inputPassValue, setInputPassValue] = useState('');
    
    const onIconClick = () => {};

    return (
        <form className={`${styles.form_container}`}>
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
                <Input
                    name={'email-input'}
                    type={'email'}
                    placeholder={'E-mail'}
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
                    type={'password'}
                    placeholder={'Пароль'}
                    size={'default'}
                    value={inputPassValue}
                    onChange={e => setInputPassValue(e.target.value)}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                />
            </div>
        </form>
    )
}