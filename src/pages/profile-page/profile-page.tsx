import React, { FC } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import styles from './profile-page.module.css';
import { clearUserAction } from '../../services/actions/user';
import { useNavigate } from 'react-router-dom';
import { fetchLogout } from '../../utils/api/user-request';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { WS_BASE_URL } from '../../utils/constants';
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_START,
} from '../../services/constants/websocket';

const ProfilePage: FC = () => {
    const location = useLocation();
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    React.useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: `${WS_BASE_URL}?token=${localStorage.getItem(
                'accessToken'
            )}`,
        });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE });
        };
    }, []);

    const handleLogout = () => {
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
                        if (location.pathname !== '/profile') {
                            isActive = false;
                        }

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
                {location.pathname === '/profile' && (
                    <p
                        className={`text text_type_main-default text_color_inactive`}
                    >
                        В этом разделе вы можете изменить свои персональные
                        данные
                    </p>
                )}
                {location.pathname === '/profile/orders' && (
                    <p
                        className={`text text_type_main-default text_color_inactive`}
                    >
                        В этом разделе вы можете просмотреть свою историю
                        заказов
                    </p>
                )}
            </div>
            <Outlet />
        </div>
    );
};

export default ProfilePage;
