import React from 'react';
import {
    EmailInput,
    PasswordInput,
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import isValidEmail from '../../utils/validEmail';
import styles from './profile-user-information-page.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAction } from '../../services/actions/user';
import { patchUser } from '../../utils/api/user-request';

const getUser = (store) => store.user.user;

const ProfileUserInformationPage = () => {
    const [isError, setError] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [emailValue, setEmailValue] = React.useState(user?.email || '');
    const [passwordValue, setPasswordValue] = React.useState('');
    const onEmailChange = (e) => {
        setEmailValue(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };
    const [nameValue, setNameValue] = React.useState(user?.name || '');
    const inputInputNameRef = React.useRef(null);
    const handleRemoveChanges = () => {
        setPasswordValue('');
        setEmailValue(user?.email || '');
        setNameValue(user?.name || '');
    };

    const handleUpdateUser = () => {
        setError(false);
        try {
            const form = {};
            if (nameValue !== user?.name) {
                form['name'] = nameValue;
            }
            if (emailValue !== user?.email) {
                form['email'] = emailValue;
            }
            if (passwordValue !== 0) {
                form['password'] = passwordValue;
            }
            patchUser(form);
            dispatch(updateUserAction(user));
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
                icon='EditIcon'
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
