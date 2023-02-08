import React from 'react';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import imagePath from '../../images/order-details/done.png';
import styles from './order-details.module.css';

export default function OrderDetails(props) {
    return (
        <Modal
            handleToggleModal={props.handleToggleModal}
            width={720}
            height={718}
            title={''}
        >
            <div className={`${styles.elements_center} mt-4`}>
                <p
                    className={`text text_type_digits-large mb-8 ${styles.text_center}`}
                >
                    034536
                </p>
                <p
                    className={`text text_type_main-medium ${styles.text_center} mb-15`}
                >
                    идентификатор заказа
                </p>
                <img className="mb-15" src={imagePath} alt="картинка" />
                <p
                    className={`text text_type_main-default ${styles.text_center} mb-2`}
                >
                    ваш заказ начали готовить
                </p>
                <p
                    className={`text text_type_main-default ${styles.text_center} text_color_inactive`}
                >
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </Modal>
    );
}

OrderDetails.propTypes = {
    handleToggleModal: PropTypes.func.isRequired,
};
