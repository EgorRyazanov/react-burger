import React from 'react';
import {
    Input,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchResetPassword } from '../../utils/api/user-request';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isError, setError] = React.useState(false);
    const [passwordValue, setPasswordValue] = React.useState('');
    const onPasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };

    const handleRedirectToLogin = () => {
        navigate('/login');
    };

    const handleResetPassword = () => {
        setError(false);
        fetchResetPassword(passwordValue, codeValue)
            .then(navigate('/login', { replace: true }))
            .catch(() => {
                setError(true);
            });
    };
    React.useEffect(() => {
        if (location.state?.from !== 'forgot-password' || location.state.from) {
            navigate('/', { replace: true });
        }
    }, []);

    const [codeValue, setCodeValue] = React.useState('');
    const inputInputCodeRef = React.useRef(null);

    return (
        <div className='login-container container'>
            <p className={`text text_type_main-medium mb-6 text-center`}>
                Вход
            </p>
            <PasswordInput
                onChange={onPasswordChange}
                placeholder={'Введите новый пароль'}
                value={passwordValue}
                name={'password'}
                extraClass='mb-6'
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={(e) => setCodeValue(e.target.value)}
                value={codeValue}
                name={'name'}
                error={false}
                ref={inputInputCodeRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass='mb-6'
            />
            {isError ? (
                <p className='text text_type_main-medium text-error mb-6'>
                    Произошла ошибка, попробуйте еще раз
                </p>
            ) : null}
            <Button
                htmlType='button'
                type='primary'
                size='medium'
                disabled={!(codeValue && passwordValue)}
                extraClass='mb-20'
                onClick={handleResetPassword}
            >
                Войти
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

export default ResetPassword;
