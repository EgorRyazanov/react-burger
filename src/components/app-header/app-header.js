import React from 'react';
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import NavbarItem from '../navbar-item/navbar-item';

export default function AppHeader() {
    return (
        <header className={styles.header}>
            <div className="container">
                <nav className="pt-6 pb-6">
                    <ul className={styles.list}>
                        <li className="mr-2">
                            <NavbarItem
                                component={<BurgerIcon />}
                                name="Конструктор"
                            />
                        </li>
                        <li style={{ marginRight: 112 }}>
                            <NavbarItem
                                component={<ListIcon />}
                                name="Лента Заказов"
                            />
                        </li>
                        <li style={{ marginRight: 288 }}>
                            <Logo />
                        </li>
                        <li>
                            <NavbarItem
                                component={<ProfileIcon />}
                                name="Личный кабинет"
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
