import * as React from 'react';
import {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import axios, {AxiosError} from 'axios';
import cn from 'classnames';

import {CommonContext} from '../../../context/CommonContext';
import {checkErrors} from '../../../helpers/common';
import {Input} from '../../common/Input/Input';

import {CommonError} from '../../../models/commonError';
import {LoginDataForm} from '../../../models/forms/loginDataForm';
import {LoginFormProps} from './models/loginFormProps';
import styles from './LoginForm.module.css';

export const LoginForm: React.FC<LoginFormProps> = ({loginHandler}) => {
    const {changeIsLoading} = useContext(CommonContext);
    const [commonErrors, setCommonErrors] = useState<CommonError | null>(null);

    const {
        formState: {errors},
        register,
        handleSubmit,
    } = useForm<LoginDataForm>({
        mode: 'onChange',
    });

    const onSubmit = async (formData: LoginDataForm) => {
        changeIsLoading(true);
        try {
            await loginHandler(formData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = checkErrors(error as AxiosError<CommonError>);
                setCommonErrors(serverError);
            }
        } finally {
            changeIsLoading(false);
        }
    }

    return (
        <div>
            <h2 className={styles.heading}>Вход</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={cn(styles.login, {[styles.errorInput]: errors?.login && errors?.login?.message !== ''})}>
                    <Input
                        name="login"
                        type="text"
                        isRequired={true}
                        autoFocus={true}
                        placeholder="Логин"
                        error={errors?.login}
                        register={register}/>
                    {errors?.login && <div className={styles.errorText}>{errors.login.message}</div>}
                </div>
                <div className={cn(styles.password, {[styles.errorInput]: errors?.password && errors?.password?.message !== ''})}>
                    <Input
                        name="password"
                        type="password"
                        isRequired={true}
                        autoFocus={false}
                        minValue={4}
                        placeholder="Пароль"
                        error={errors?.password}
                        register={register}/>
                    {errors?.password && <div className={styles.errorText}>{errors.password.message}</div>}
                </div>
                {commonErrors && <div className={styles.errorText}>{commonErrors.message}</div>}
                <div className={styles.btnContainer} onMouseDown={(e) => e.preventDefault()}>
                    <button
                        className={styles.btnSave}
                        type="submit">
                        Войти
                    </button>
                </div>
                <div className={styles.linkContainer}>
                    <span className={styles.question}>У Вас еще нет аккаунта?</span>
                    <NavLink
                        className={styles.link}
                        to="/register">
                        Зарегистрироваться
                    </NavLink>
                </div>
            </form>
        </div>
    )
};
