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
                                component={<BurgerIcon type="primary" />}
                                name="Конструктор"
                                active={true}
                            />
                        </li>
                        <li className={styles.order}>
                            <NavbarItem
                                component={<ListIcon type="secondary" />}
                                name="Лента Заказов"
                                active={false}
                            />
                        </li>
                        <li className={styles.logo}>
                            <Logo />
                        </li>
                        <li>
                            <NavbarItem
                                component={<ProfileIcon type="secondary" />}
                                name="Личный кабинет"
                                active={false}
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
