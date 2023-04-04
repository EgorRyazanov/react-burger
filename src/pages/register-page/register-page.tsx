import React, { FC, useState, useRef, useEffect } from 'react';
import {
    EmailInput,
    PasswordInput,
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import isValidEmail from '../../utils/validEmail';
import { useNavigate } from 'react-router-dom';
import { resetErrorStatusAction } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';
import { TRootState } from '../../services/reducers/root';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { fetchRegisterUserAction } from '../../services/actions/user';

const getErrorStatus = (state: TRootState) => state.user.status.fetchUserFailed;
const getUser = (state: TRootState) => state.user.user;

const Register: FC = () => {
    const dispatch = useTypedDispatch();
    const { values, handleChange } = useForm({
        email: '',
        password: '',
        name: '',
    });
    const error = useTypedSelector(getErrorStatus);
    const user = useTypedSelector(getUser);
    const navigate = useNavigate();
    const [isError, setError] = useState(false);
    const inputInputNameRef = useRef(null);
    const handleLogin = () => {
        navigate('/login');
    };
    const handleResisterUser = (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        dispatch(
            fetchRegisterUserAction(values.email, values.password, values.name)
        );
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
                Регистрация
            </p>
            <form onSubmit={handleResisterUser} className='form-container'>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    error={false}
                    ref={inputInputNameRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass='mb-6'
                />
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
                        При регистристрации произошла ошибка, попробуйте еще раз
                    </p>
                ) : null}
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'
                    disabled={!(isValidEmail(values.email) && values.password)}
                    extraClass='mb-20'
                >
                    Зарегистрироваться
                </Button>
            </form>
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
