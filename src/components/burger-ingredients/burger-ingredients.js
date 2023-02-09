import React from 'react';
import styles from './burger-ingredients.module.css';
import TabComponent from '../tab-component/tab-component';
import IngredientBlock from '../ingredient-block/ingredient-block';
import { getData } from '../../utils/api';
import { VALUE_BUN, VALUE_SAUCE, VALUE_MAIN } from '../../utils/constants';

export default function BurgerIngridients() {
    const [current, setCurrent] = React.useState(VALUE_BUN);
    const [data, setData] = React.useState([]);
    const [ingredients, setIngridients] = React.useState({
        buns: [],
        sauces: [],
        main: [],
    });

    const handleTabScroll = (element) => {
        setCurrent(element);
        document.getElementById(element).scrollIntoView();
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

    React.useEffect(() => {
        getData().then((result) => setData(result.data));
    }, []);

    return (
        <div className="pt-10 mr-10" style={{ width: 600, height: 912 }}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <TabComponent current={current} handleTabScroll={handleTabScroll} />
            <div className={styles.scroll} style={{ height: 716 }}>
                <IngredientBlock
                    id={VALUE_BUN}
                    name="Булки"
                    ingredients={ingredients.buns}
                />
                <IngredientBlock
                    id={VALUE_SAUCE}
                    name="Соусы"
                    ingredients={ingredients.sauces}
                />
                <IngredientBlock
                    id={VALUE_MAIN}
                    name="Начинка"
                    ingredients={ingredients.main}
                />
            </div>
        </div>
    );
}
