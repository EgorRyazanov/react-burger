import React, { FC, useState, useEffect } from 'react';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import isValidEmail from '../../utils/validEmail';
import { useNavigate } from 'react-router-dom';
import { resetErrorStatusAction } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';
import { TRootState } from '../../services/reducers/root';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { fetchLoginAction } from '../../services/actions/user';

const getErrorStatus = (state: TRootState) => state.user.status.fetchUserFailed;
const getUser = (state: TRootState) => state.user.user;

const Login: FC = () => {
    const { values, handleChange } = useForm({
        email: '',
        password: '',
    });
    const error = useTypedSelector(getErrorStatus);
    const user = useTypedSelector(getUser);
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const [isError, setError] = useState(false);

    const handleRedirectToRegister = () => {
        navigate('/register');
    };
    const handleRedirectToForgot = () => {
        navigate('/forgot-password');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        dispatch(fetchLoginAction(values.email, values.password));
    };
    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user]);

    useEffect(() => {
        if (error) {
            setError(true);
            dispatch(resetErrorStatusAction);
        }
    }, [error]);

    return (
        <div className='login-container container'>
            <p className={`text text_type_main-medium mb-6 text-center`}>
                Вход
            </p>
            <form onSubmit={handleLogin} className='form-container'>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                    extraClass='mb-6'
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    extraClass='mb-6'
                />
                {isError ? (
                    <p className='text text_type_main-medium text-error mb-6'>
                        При авторизации произошла ошибка, попробуйте еще раз
                    </p>
                ) : null}
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'
                    disabled={!(isValidEmail(values.email) && values.password)}
                    extraClass='mb-20'
                >
                    Войти
                </Button>
            </form>
            <div className={`${styles.text_container} mb-4`}>
                <p className='text text_type_main-default text_color_inactive mr-2'>
                    Вы&nbsp;&mdash; новый пользователь?
                </p>
                <Button
                    htmlType='button'
                    type='secondary'
                    size='medium'
                    extraClass={styles.button_reset}
                    onClick={handleRedirectToRegister}
                >
                    Зарегистрироваться
                </Button>
            </div>
            <div className={styles.text_container}>
                <p className='text text_type_main-default text_color_inactive mr-2'>
                    Забыли пароль?
                </p>
                <Button
                    htmlType='button'
                    type='secondary'
                    size='medium'
                    extraClass={styles.button_reset}
                    onClick={handleRedirectToForgot}
                >
                    Восстановить пароль
                </Button>
            </div>
        </div>
    );
};

export default Login;
