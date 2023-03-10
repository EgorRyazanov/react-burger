import React from 'react';
import styles from './not-found.module.css';

const NotFound = () => {
    return (
        <div className={`container ${styles.not_found__container}`}>
            <p className='text text_type_main-large text-center'>
                Такой страницы не существует :(
            </p>
        </div>
    );
};

export default NotFound;
