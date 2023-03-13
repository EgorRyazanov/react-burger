import React from 'react';
import styles from './loading-modal.module.css';

const LoadingModal = React.memo(() => {
    return (
        <div className={`${styles.elements_center} mt-4`}>
            <p className={`text text_type_main-large mb-8 text-center`}>
                Загрузка...
            </p>
            <p className={`text text_type_main-large mb-8 text-center`}>
                Подождите немного
            </p>
        </div>
    );
});

export default LoadingModal;
