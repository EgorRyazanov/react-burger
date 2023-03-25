import React, { FC, cloneElement } from 'react';
import style from './navbar-item.module.css';
import { NavLink } from 'react-router-dom';

interface INavbarItem {
    name: string;
    component: JSX.Element;
    link: string;
}

const NavbarItem: FC<INavbarItem> = (props) => {
    return (
        <NavLink
            to={props.link}
            className={`${style.button} pl-5 pr-5 pb-4 pt-4`}
        >
            {({ isActive }) => (
                <>
                    {!isActive
                        ? props.component
                        : cloneElement(props.component, {
                              type: 'primary',
                          })}
                    <p
                        className={`ml-2 text text_type_main-default ${
                            !isActive ? 'text_color_inactive' : null
                        }`}
                    >
                        {props.name}
                    </p>
                </>
            )}
        </NavLink>
    );
};

export default NavbarItem;
