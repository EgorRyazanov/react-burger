import React from 'react';
import style from './navbar-item.module.css';
import PropTypes from 'prop-types';

export default function NavbarItem(probs) {
    return (
        <button className={`${style.button} pl-5 pr-5 pb-4 pt-4`}>
            {probs.component}
            <p className={'ml-2 text text_type_main-default'}>{probs.name}</p>
        </button>
    );
}

NavbarItem.propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired,
};