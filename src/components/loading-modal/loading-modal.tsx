import React, { FC, memo } from 'react';
import styles from './loading-modal.module.css';
import preloader from '../../assets/images/preloader.svg';

const LoadingModal: FC = memo(() => {
    return (
        <div className={`${styles.elements_center} mt-4`}>
            <p className={`text text_type_main-large mb-8 text-center`}>
                Загрузка...
            </p>
            <p className={`text text_type_main-large mb-8 text-center`}>
                Подождите немного
            </p>
            <img
                src={preloader}
                className={styles.preloader}
                alt='загрузочная картинка'
            />
        </div>
    );
});

export default LoadingModal;
