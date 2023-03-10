import React from 'react';
import {
    EmailInput,
    PasswordInput,
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import isValidEmail from '../../utils/validEmail';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchRegisterUserAction,
    resetErrorStatusAction,
} from '../../services/actions/user';

const getErrorStatus = (state) => state.user.status.fetchUserFailed;
const getUser = (state) => state.user.user;

const Register = () => {
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
    const [nameValue, setNameValue] = React.useState('');
    const inputInputNameRef = React.useRef(null);
    const handleLogin = () => {
        navigate('/login');
    };
    const handleResisterUser = () => {
        setError(false);
        dispatch(fetchRegisterUserAction(emailValue, passwordValue, nameValue));
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
                Регистрация
            </p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(e) => setNameValue(e.target.value)}
                value={nameValue}
                name={'name'}
                error={false}
                ref={inputInputNameRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass='mb-6'
            />
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
                    При регистристрации произошла ошибка, попробуйте еще раз
                </p>
            ) : null}
            <Button
                htmlType='button'
                type='primary'
                size='medium'
                disabled={!(isValidEmail(emailValue) && passwordValue)}
                extraClass='mb-20'
                onClick={handleResisterUser}
            >
                Зарегистрироваться
            </Button>
            <div className={styles.text_container}>
                <p className='text text_type_main-default text_color_inactive mr-2'>
                    Уже зарегистрированы?
                </p>
                <Button
                    htmlType='button'
                    type='secondary'
                    size='medium'
                    extraClass={styles.button_reset}
                    onClick={handleLogin}
                >
                    Войти
                </Button>
            </div>
        </div>
    );
};

export default Register;
