import React from 'react';
import {
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import isValidEmail from '../../utils/validEmail';
import { useNavigate } from 'react-router-dom';
import { fetchRecoverPassword } from '../../utils/api/user-request';
import { useForm } from '../../hooks/useForm';

const ForgotPassword = () => {
    const { values, handleChange } = useForm({
        email: '',
    });
    const [isError, setError] = React.useState(false);
    const navigate = useNavigate();
    const handleRedirectToLogin = () => {
        navigate('/login');
    };
    const handleForgotPassword = (e) => {
        e.preventDefault();
        setError(false);
        fetchRecoverPassword(values.email)
            .then(
                navigate('/reset-password', {
                    replace: true,
                    state: {
                        from: 'forgot-password',
                    },
                })
            )
            .catch((e) => {
                setError(true);
            });
    };
    return (
        <div className='login-container container'>
            <p className={`text text_type_main-medium mb-6 text-center`}>
                Восстановление пароля
            </p>
            <form onSubmit={handleForgotPassword} className='form-container'>
                <EmailInput
                    onChange={handleChange}
                    placeholder={'Укажите e-mail'}
                    value={values.email}
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
                    htmlType='submit'
                    type='primary'
                    size='medium'
                    disabled={!isValidEmail(values.email)}
                    extraClass='mb-20'
                >
                    Восстановить
                </Button>
            </form>
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
