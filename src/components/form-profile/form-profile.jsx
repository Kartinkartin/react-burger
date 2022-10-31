import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-profile.module.css';
import { changeUserData } from '../../services/actions';
import { useForm } from '../../services/hooks/useForm';


export default function FormProfile({ userData }) {
    const dispatch = useDispatch();
    const {values, handleChange, setValues} = useForm({ name: userData.name, email: userData.email, password: '' });
    const [dirty, setDirty] = useState(false);
    const token = useSelector(store => store.login.token);

    const onChange = (e) => {
        handleChange(e);
        if (!dirty) setDirty(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            ...values
        };

        dispatch(changeUserData(token, newData));
        setDirty(false)
    }

    const handleReset = (e) => {
        e.preventDefault();
        setValues({name: userData.name, email: userData.email, password: ''});
    
        setDirty(false)
    }

    const onIconClick = () => { };
    return (
        <form
            className={`${styles.form_container}`}
            onSubmit={handleSubmit} >
            <div className={`${styles.input_container} pb-6`}>
                <Input
                    name={'name'}
                    type={'text'}
                    placeholder={'Name'}
                    size={'default'}
                    value={values.name}
                    onChange={onChange}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={`${styles.input_container} pb-6`}>
                <EmailInput
                    name={'email'}
                    size={'default'}
                    value={values.email}
                    onChange={onChange}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={`${styles.input_container} pb-6`}>
                <Input
                    name={'password'}
                    type={'password'}
                    placeholder={'Пароль'}
                    size={'default'}
                    value={values.password}
                    onChange={onChange}
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