import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styles from './profile-page.module.css';
import { useDispatch } from 'react-redux';
import { clearUserAction } from '../../services/actions/user';
import { useNavigate } from 'react-router-dom';
import { fetchLogout } from '../../utils/api/user-request';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        try {
            fetchLogout();
        } finally {
            localStorage.clear();
            dispatch(clearUserAction);
            navigate('/login', { replace: true });
        }
    };
    return (
        <div className='container pt-30 flex'>
            <div className={styles.links_container}>
                <NavLink to='/profile'>
                    {({ isActive }) => {
                        return (
                            <p
                                className={`text text_type_main-medium ${
                                    styles.link
                                } ${
                                    !isActive
                                        ? 'text_color_inactive'
                                        : styles.active
                                }`}
                            >
                                Профиль
                            </p>
                        );
                    }}
                </NavLink>
                <NavLink to='/profile/orders'>
                    {({ isActive }) => {
                        return (
                            <p
                                className={`text text_type_main-medium ${
                                    styles.link
                                } ${
                                    !isActive
                                        ? 'text_color_inactive'
                                        : styles.active
                                }`}
                            >
                                История заказов
                            </p>
                        );
                    }}
                </NavLink>
                <a href='#' className='mb-20' onClick={handleLogout}>
                    <p
                        className={`text text_type_main-medium text_color_inactive ${styles.link}`}
                    >
                        Выход
                    </p>
                </a>
                <p
                    className={`text text_type_main-default text_color_inactive`}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <Outlet />
        </div>
    );
};

export default ProfilePage;
