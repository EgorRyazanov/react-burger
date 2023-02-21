import React from 'react';
import styles from './burger-ingredients.module.css';
import TabComponent from '../tab-component/tab-component';
import IngredientBlock from '../ingredient-block/ingredient-block';
import { VALUE_BUN, VALUE_SAUCE, VALUE_MAIN } from '../../utils/constants';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import {
    getFetchIngredientsAction,
    removeDetailIngredientAction,
} from '../../services/actions';

export default function BurgerIngridients() {
    const bunsRef = React.useRef();
    const saucesRef = React.useRef();
    const mainRef = React.useRef();
    const tabs = [
        { value: VALUE_BUN, ref: bunsRef, title: 'Булки' },
        { value: VALUE_SAUCE, ref: saucesRef, title: 'Соусы' },
        { value: VALUE_MAIN, ref: mainRef, title: 'Начинка' },
    ];

    let visibleHeaders = {};
    const handleObserve = (entries) => {
        for (const entry of entries) {
            visibleHeaders[entry.target.id] = entry.isIntersecting;
        }

        for (const header in visibleHeaders) {
            if (visibleHeaders[header]) {
                setCurrent(header);
                break;
            }
        }
    };

    const dispatch = useDispatch();
    const [active, setActive] = React.useState(false);
    const handleToggleModal = () => {
        if (active) {
            dispatch(removeDetailIngredientAction);
        }
        setActive(!active);
    };
    const { ingredients, fetchIngredientsRequest, fetchIngredientsFailed } =
        useSelector((state) => state.fetchIngredients);
    const [current, setCurrent] = React.useState(VALUE_BUN);
    const [sortedIngredients, setIngridients] = React.useState({
        buns: [],
        sauces: [],
        main: [],
    });

    const handleTabScroll = (value, element) => {
        setCurrent(value);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        dispatch(getFetchIngredientsAction());
    }, []);

    React.useEffect(() => {
        const bunsContainer = [];
        const saucesContainer = [];
        const mainContainer = [];
        ingredients.forEach((element) => {
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

        const sectionObserver = new IntersectionObserver(handleObserve, {
            root: document.querySelector('.parent'),
        });
        [bunsRef, saucesRef, mainRef].forEach((section) =>
            sectionObserver.observe(section.current)
        );
    }, [ingredients]);

    return (
        <>
            {!fetchIngredientsRequest &&
                !fetchIngredientsFailed &&
                ingredients && (
                    <div className={`pt-10 mr-10 ${styles.global}`}>
                        <p className="text text_type_main-large mb-5">
                            Соберите бургер
                        </p>
                        <TabComponent
                            tabs={tabs}
                            handleTabScroll={handleTabScroll}
                            current={current}
                        />
                        <div className={`${styles.scroll} parent`}>
                            <IngredientBlock
                                id={VALUE_BUN}
                                ref={bunsRef}
                                name="Булки"
                                ingredients={sortedIngredients.buns}
                                handleToggleModal={handleToggleModal}
                            />
                            <IngredientBlock
                                id={VALUE_SAUCE}
                                ref={saucesRef}
                                name="Соусы"
                                ingredients={sortedIngredients.sauces}
                                handleToggleModal={handleToggleModal}
                            />
                            <IngredientBlock
                                id={VALUE_MAIN}
                                ref={mainRef}
                                name="Начинка"
                                ingredients={sortedIngredients.main}
                                handleToggleModal={handleToggleModal}
                            />
                            {active && (
                                <Modal
                                    title={'Детали ингредиента'}
                                    container={styles.modal}
                                    handleToggleModal={handleToggleModal}
                                >
                                    <IngredientDetails />
                                </Modal>
                            )}
                        </div>
                    </div>
                )}
        </>
    );
}
