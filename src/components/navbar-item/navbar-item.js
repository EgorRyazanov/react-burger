import React from 'react';
import style from './navbar-item.module.css';
import PropTypes from 'prop-types';

export default function NavbarItem(props) {
    const isActive = props.active ? '' : 'text_color_inactive';
    return (
        <a href="#" className={`${style.button} pl-5 pr-5 pb-4 pt-4`}>
            {props.component}
            <p className={`ml-2 text text_type_main-default ${isActive}`}>
                {props.name}
            </p>
        </a>
    );
}

NavbarItem.propTypes = {
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired,
};
