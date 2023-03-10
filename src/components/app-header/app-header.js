import React from 'react';
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import NavbarItem from '../navbar-item/navbar-item';
import { useSelector } from 'react-redux';

const getUser = (store) => store.user.user;

export default function AppHeader() {
    const profileName = useSelector(getUser)?.name || 'Личный кабинет';
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
                                link='/all-orders'
                            />
                        </li>
                        <li className={styles.logo}>
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
}
