import React, { useRef, FC, useState, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import TabComponent from '../tab-component/tab-component';
import IngredientBlock from '../ingredient-block/ingredient-block';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { TRootState } from '../../services/reducers/root';
import { TIngredient } from '../../utils/types/ingredient-type';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const getIngredientsFromStore = (state: TRootState) => state.fetchIngredients;

type TVisibleHeaders = {
    [name in TabIndexes]?: boolean;
};

export enum TabIndexes {
    bun = 'bun',
    sauce = 'sauce',
    main = 'main',
}

export type TTabs = {
    value: TabIndexes;
    ref: React.RefObject<HTMLParagraphElement>;
    title: string;
}[];

type TSortedIngredients = {
    buns: Array<TIngredient>;
    sauces: Array<TIngredient>;
    main: Array<TIngredient>;
};

const BurgerIngridients: FC = () => {
    const bunsRef = useRef<HTMLParagraphElement>(null);
    const saucesRef = useRef<HTMLParagraphElement>(null);
    const mainRef = useRef<HTMLParagraphElement>(null);
    const tabs: TTabs = [
        { value: TabIndexes.bun, ref: bunsRef, title: 'Булки' },
        { value: TabIndexes.sauce, ref: saucesRef, title: 'Соусы' },
        { value: TabIndexes.main, ref: mainRef, title: 'Начинка' },
    ];

    let visibleHeaders: TVisibleHeaders = {};
    const handleObserve = (entries: Array<IntersectionObserverEntry>) => {
        for (const entry of entries) {
            visibleHeaders[entry.target.id as TabIndexes] =
                entry.isIntersecting;
        }

        for (const header in visibleHeaders) {
            if (visibleHeaders[header as TabIndexes]) {
                setCurrent(header as TabIndexes);
                break;
            }
        }
    };

    const [active, setActive] = React.useState(false);
    const handleToggleModal = () => {
        setActive(!active);
    };
    const { ingredients } = useTypedSelector(getIngredientsFromStore);
    const [current, setCurrent] = React.useState<TabIndexes>(TabIndexes.bun);
    const [sortedIngredients, setIngridients] = useState<TSortedIngredients>({
        buns: [],
        sauces: [],
        main: [],
    });

    const handleTabScroll = (value: TabIndexes, element: Element) => {
        setCurrent(value);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const bunsContainer: Array<TIngredient> = [];
        const saucesContainer: Array<TIngredient> = [];
        const mainContainer: Array<TIngredient> = [];
        ingredients.forEach((element) => {
            switch (element.type) {
                case TabIndexes.bun:
                    bunsContainer.push(element);
                    break;
                case TabIndexes.sauce:
                    saucesContainer.push(element);
                    break;
                case TabIndexes.main:
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
        [bunsRef, saucesRef, mainRef].forEach((section) => {
            sectionObserver.observe(section.current as Element);
        });
    }, [ingredients]);

    return (
        <>
            {ingredients && (
                <div className={`pt-10 mr-10 ${styles.global}`}>
                    <p className='text text_type_main-large mb-5'>
                        Соберите бургер
                    </p>
                    <TabComponent
                        tabs={tabs}
                        handleTabScroll={handleTabScroll}
                        current={current}
                    />
                    <div className={`${styles.scroll} parent`}>
                        <IngredientBlock
                            id={TabIndexes.bun}
                            ref={bunsRef}
                            name='Булки'
                            ingredients={sortedIngredients.buns}
                        />
                        <IngredientBlock
                            id={TabIndexes.sauce}
                            ref={saucesRef}
                            name='Соусы'
                            ingredients={sortedIngredients.sauces}
                        />
                        <IngredientBlock
                            id={TabIndexes.main}
                            ref={mainRef}
                            name='Начинка'
                            ingredients={sortedIngredients.main}
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
};

export default BurgerIngridients;
