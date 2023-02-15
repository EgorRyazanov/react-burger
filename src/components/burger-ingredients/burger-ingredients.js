import React from 'react';
import styles from './burger-ingredients.module.css';
import TabComponent from '../tab-component/tab-component';
import IngredientBlock from '../ingredient-block/ingredient-block';
import { VALUE_BUN, VALUE_SAUCE, VALUE_MAIN } from '../../utils/constants';
import { ApiContext } from '../../services/apiContext';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

export default function BurgerIngridients() {
    const [active, setActive] = React.useState(false);
    const handleToggleModal = () => {
        setActive(!active);
    };
    const [modalData, setModalData] = React.useState();
    const { data } = React.useContext(ApiContext);
    const [current, setCurrent] = React.useState(VALUE_BUN);
    const [ingredients, setIngridients] = React.useState({
        buns: [],
        sauces: [],
        main: [],
    });

    const handleTabScroll = (element) => {
        setCurrent(element);
        document.getElementById(element).scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        const bunsContainer = [];
        const saucesContainer = [];
        const mainContainer = [];
        data.forEach((element) => {
            switch (element.type) {
                case VALUE_BUN:
                    bunsContainer.push(element);
                    break;
                case VALUE_SAUCE:
                    saucesContainer.push(element);
                    break;
                case VALUE_MAIN:
                    mainContainer.push(element);
                    break;
                default:
            }
        });
        setIngridients({
            buns: bunsContainer,
            sauces: saucesContainer,
            main: mainContainer,
        });
    }, [data]);

    return (
        <div className={`pt-10 mr-10 ${styles.global}`}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <TabComponent current={current} handleTabScroll={handleTabScroll} />
            <div className={styles.scroll}>
                <IngredientBlock
                    id={VALUE_BUN}
                    name="Булки"
                    ingredients={ingredients.buns}
                    active={active}
                    setActive={setActive}
                    setModalData={setModalData}
                />
                <IngredientBlock
                    id={VALUE_SAUCE}
                    name="Соусы"
                    ingredients={ingredients.sauces}
                    active={active}
                    setActive={setActive}
                    setModalData={setModalData}
                />
                <IngredientBlock
                    id={VALUE_MAIN}
                    name="Начинка"
                    ingredients={ingredients.main}
                    active={active}
                    setActive={setActive}
                    setModalData={setModalData}
                />
                {active && (
                    <Modal
                        title={'Детали ингредиента'}
                        container={styles.modal}
                        handleToggleModal={handleToggleModal}
                    >
                        <IngredientDetails {...modalData} />
                    </Modal>
                )}
            </div>
        </div>
    );
}
