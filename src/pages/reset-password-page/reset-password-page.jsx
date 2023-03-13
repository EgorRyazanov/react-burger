import React from 'react';
import {
    Input,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchResetPassword } from '../../utils/api/user-request';
import { useForm } from '../../hooks/useForm';

const ResetPassword = () => {
    const { values, handleChange } = useForm({
        code: '',
        password: '',
    });
    const location = useLocation();
    const navigate = useNavigate();
    const [isError, setError] = React.useState(false);

    const handleRedirectToLogin = () => {
        navigate('/login');
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        setError(false);
        fetchResetPassword(values.password, values.code)
            .then(navigate('/login', { replace: true }))
            .catch(() => {
                setError(true);
            });
    };
    React.useEffect(() => {
        if (location.state?.from !== 'forgot-password') {
            navigate('/', { replace: true });
        }
    }, []);

    const inputInputCodeRef = React.useRef(null);

    return (
        <div className='login-container container'>
            <p className={`text text_type_main-medium mb-6 text-center`}>
                Восстановить пароль
            </p>
            <form onSubmit={handleResetPassword} className='form-container'>
                <PasswordInput
                    onChange={handleChange}
                    placeholder={'Введите новый пароль'}
                    value={values.password}
                    name={'password'}
                    extraClass='mb-6'
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.code}
                    name={'code'}
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
                    htmlType='sumbit'
                    type='primary'
                    size='medium'
                    disabled={!(values.code && values.password)}
                    extraClass='mb-20'
                >
                    Войти
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

export default ResetPassword;
