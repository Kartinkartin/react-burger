import React, { useState, ChangeEvent, FormEvent, SyntheticEvent, FunctionComponent } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-profile.module.css';
import { changeUserData } from '../../services/actions';
import { useDispatch, useForm, useSelector } from '../../services/hooks/hooks';
import { AppDispatch, TLoginData } from '../../services/types';
import { getAccessToken } from '../../services/selectors/selectors';

type TProfileProps = {
    userData: TLoginData
}
export const FormProfile: FunctionComponent<TProfileProps> = ({ userData }: TProfileProps) => {
    const dispatch = useDispatch();
    const {values, handleChange, setValues} = useForm({ name: userData.name, email: userData.email, password: '' });
    const [dirty, setDirty] = useState(false);
    const token = useSelector(getAccessToken);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        if (!dirty) setDirty(true);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newData = {
            ...values
        };

        dispatch(changeUserData(token, newData));
        setDirty(false)
    }

    const handleReset = (e: SyntheticEvent) => {
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
                    isIcon={false}
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
