import React, { FC } from 'react';
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import NavbarItem from '../navbar-item/navbar-item';
import { useNavigate, useLocation } from 'react-router-dom';
import { TRootState } from '../../services/reducers/root';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const getUser = (store: TRootState) => store.user.user;

const AppHeader: FC = () => {
    const profileName = useTypedSelector(getUser)?.name || 'Личный кабинет';
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <header className={styles.header}>
            <div className='container'>
                <nav className='pt-6 pb-6'>
                    <ul className={styles.list}>
                        <li className='mr-2'>
                            <NavbarItem
                                component={<BurgerIcon type='secondary' />}
                                name='Конструктор'
                                link='/'
                            />
                        </li>
                        <li className={styles.order}>
                            <NavbarItem
                                component={<ListIcon type='secondary' />}
                                name='Лента Заказов'
                                link='/feed'
                            />
                        </li>
                        <li
                            className={styles.logo}
                            onClick={() =>
                                navigate('/', { state: { from: location } })
                            }
                        >
                            <Logo />
                        </li>
                        <li>
                            <NavbarItem
                                component={<ProfileIcon type='secondary' />}
                                name={profileName}
                                link='/profile'
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
