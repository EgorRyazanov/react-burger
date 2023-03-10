import React from 'react';
import style from './navbar-item.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function NavbarItem(props) {
    return (
        <NavLink
            to={props.link}
            className={`${style.button} pl-5 pr-5 pb-4 pt-4`}
        >
            {({ isActive }) => (
                <>
                    {!isActive
                        ? props.component
                        : React.cloneElement(props.component, {
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
}

NavbarItem.propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired,
};
