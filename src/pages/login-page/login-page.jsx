import React from 'react';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import isValidEmail from '../../utils/validEmail';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchLoginAction,
    resetErrorStatusAction,
} from '../../services/actions/user';

const getErrorStatus = (state) => state.user.status.fetchUserFailed;
const getUser = (state) => state.user.user;

const Login = () => {
    const error = useSelector(getErrorStatus);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [isError, setError] = React.useState(false);
    const onEmailChange = (e) => {
        setEmailValue(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };

    const handleRedirectToRegister = () => {
        navigate('/register');
    };
    const handleRedirectToForgot = () => {
        navigate('/forgot-password');
    };

    const handleLogin = () => {
        setError(false);
        dispatch(fetchLoginAction(emailValue, passwordValue));
    };
    React.useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user]);

    React.useEffect(() => {
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
            <EmailInput
                onChange={onEmailChange}
                value={emailValue}
                name={'email'}
                isIcon={false}
                extraClass='mb-6'
            />
            <PasswordInput
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
                extraClass='mb-6'
            />
            {isError ? (
                <p className='text text_type_main-medium text-error mb-6'>
                    При авторизации произошла ошибка, попробуйте еще раз
                </p>
            ) : null}
            <Button
                htmlType='button'
                type='primary'
                size='medium'
                disabled={!(isValidEmail(emailValue) && passwordValue)}
                extraClass='mb-20'
                onClick={handleLogin}
            >
                Войти
            </Button>
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
