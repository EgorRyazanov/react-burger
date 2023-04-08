import React, { FC, useState, useRef } from 'react';
import {
    EmailInput,
    PasswordInput,
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import isValidEmail from '../../utils/validEmail';
import styles from './profile-user-information-page.module.css';
import { TRootState } from '../../services/reducers/root';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TForm } from '../../hooks/useForm';
import { patchWithTokenAction } from '../../services/actions/user';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';

const getUser = (store: TRootState) => store.user.user;

const ProfileUserInformationPage: FC = () => {
    const dispatch = useTypedDispatch();
    const [isError, setError] = useState(false);
    const user = useTypedSelector(getUser);
    const [emailValue, setEmailValue] = useState(user?.email || '');
    const [passwordValue, setPasswordValue] = React.useState('');
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };
    const [nameValue, setNameValue] = useState(user?.name || '');
    const inputInputNameRef = useRef(null);
    const handleRemoveChanges = () => {
        setPasswordValue('');
        setEmailValue(user?.email || '');
        setNameValue(user?.name || '');
    };

    const handleUpdateUser = () => {
        setError(false);
        try {
            const form: TForm = {};
            if (nameValue !== user?.name) {
                form['name'] = nameValue;
            }
            if (emailValue !== user?.email) {
                form['email'] = emailValue;
            }
            if (passwordValue !== '') {
                form['password'] = passwordValue;
            }
            dispatch(patchWithTokenAction(form));
        } catch {
            setError(true);
        }
    };
    return (
        <div>
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
                icon='EditIcon'
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
                icon='EditIcon'
            />
            {isError ? (
                <p className='text text_type_main-medium text-error mb-6'>
                    При редактировании произошла ошибка, попробуйте еще раз
                </p>
            ) : null}
            <div className={styles.buttons_container}>
                <Button
                    onClick={handleRemoveChanges}
                    htmlType='button'
                    type='secondary'
                    size='medium'
                >
                    Отменить
                </Button>
                <Button
                    htmlType='button'
                    type='primary'
                    size='medium'
                    disabled={
                        !isValidEmail(emailValue) || nameValue.length === 0
                    }
                    onClick={handleUpdateUser}
                >
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default ProfileUserInformationPage;
