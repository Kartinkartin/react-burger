import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-profile.module.css';
import { changeUserData } from '../../services/actions';


export default function FormProfile({ userData }) {
    const dispatch = useDispatch();
    const [inputNameValue, setInputNameValue] = useState(userData.name);
    const [inputEmailValue, setInputEmailValue] = useState(userData.email);
    const [inputPassValue, setInputPassValue] = useState('');
    const [dirty, setDirty] = useState(false);
    const newData = {};
    const token = useSelector(store => store.login.token)

    const onChange = (e, handleChange) => {
        handleChange(e.target.value);
        if (!dirty) setDirty(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            name: inputNameValue,
            email: inputEmailValue,
            password: inputPassValue
        };

        dispatch(changeUserData(token, newData));
        setDirty(false)
    }

    const handleReset = (e) => {
        e.preventDefault();
        setInputNameValue(userData.name);
        setInputEmailValue(userData.email);
        setInputPassValue('');
        setDirty(false)
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
                    onChange={e => onChange(e, setInputNameValue)}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={`${styles.input_container} pb-6`}>
                <EmailInput
                    name={'email-input'}
                    size={'default'}
                    value={inputEmailValue}
                    onChange={e => onChange(e, setInputEmailValue)}
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
                    onChange={e => onChange(e, setInputPassValue)}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={styles.button_container}>
                <Button
                    type="primary"
                    size="medium"
                    onClick={handleReset} htmlType='reset'
                    disabled={!dirty} >
                    Отменить
                </Button>
                <Button
                    type="primary"
                    size="medium"
                    htmlType='submit'
                    disabled={!dirty} >
                    Сохранить
                </Button>
            </div>
        </form>
    )
}

FormProfile.propTypes = {
    userData: PropTypes.object.isRequired
}