import React from 'react';
import {
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import isValidEmail from '../../utils/validEmail';
import { useNavigate } from 'react-router-dom';
import { fetchRecoverPassword } from '../../utils/api/user-request';

const ForgotPassword = () => {
    const [isError, setError] = React.useState(false);
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = React.useState('');
    const onEmailChange = (e) => {
        setEmailValue(e.target.value);
    };
    const handleRedirectToLogin = () => {
        navigate('/login', {
            state: {
                from: 'forgot-password',
            },
        });
    };
    const handleForgotPassword = () => {
        setError(false);
        fetchRecoverPassword(emailValue)
            .then(navigate('/reset-password', { replace: true }))
            .catch((e) => {
                setError(true);
            });
    };

    return (
        <div className='login-container container'>
            <p className={`text text_type_main-medium mb-6 text-center`}>
                Восстановление пароля
            </p>
            <EmailInput
                onChange={onEmailChange}
                placeholder={'Укажите e-mail'}
                value={emailValue}
                name={'email'}
                isIcon={false}
                extraClass='mb-6'
            />
            {isError ? (
                <p className='text text_type_main-medium text-error mb-6'>
                    Произошла ошибка, попробуйте еще раз
                </p>
            ) : null}
            <Button
                htmlType='button'
                onClick={handleForgotPassword}
                type='primary'
                size='medium'
                disabled={!isValidEmail(emailValue)}
                extraClass='mb-20'
            >
                Восстановить
            </Button>
            <div className={styles.text_container}>
                <p className='text text_type_main-default text_color_inactive mr-2'>
                    Вспомнили пароль?
                </p>
                <Button
                    htmlType='button'
                    type='secondary'
                    size='medium'
                    extraClass={styles.button_reset}
                    onClick={handleRedirectToLogin}
                >
                    Войти
                </Button>
            </div>
        </div>
    );
};

export default ForgotPassword;
