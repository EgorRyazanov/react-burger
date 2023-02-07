import React from 'react';
import styles from './burger-ingridients.module.css';
import TabComponent from '../tab-component/tab-component';
import IngredientBlock from '../ingredient-block/ingredient-block';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export default function BurgerIngridients() {
    const [current, setCurrent] = React.useState('bun');
    const [data, setData] = React.useState([]);
    const [ingridients, setIngridients] = React.useState({
        buns: [],
        sauces: [],
        main: [],
    });

    const handleTabScroll = React.useCallback((element) => {
        setCurrent(element);
        document.getElementById(element).scrollIntoView();
    });

    React.useEffect(() => {
        const bunsContainer = [];
        const saucesContainer = [];
        const mainContainer = [];
        data.forEach((element) => {
            switch (element.type) {
                case 'bun':
                    bunsContainer.push(element);
                    break;
                case 'sauce':
                    saucesContainer.push(element);
                    break;
                case 'main':
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
        const getData = async () => {
            try {
                const response = await fetch(URL);
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <div className="pt-10 mr-10" style={{ width: 600, height: 912 }}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <TabComponent current={current} handleTabScroll={handleTabScroll} />
            <div className={styles.scroll} style={{ height: 716 }}>
                <IngredientBlock
                    id="bun"
                    name="Булки"
                    ingredients={ingridients.buns}
                />
                <IngredientBlock
                    id="sauce"
                    name="Соусы"
                    ingredients={ingridients.sauces}
                />
                <IngredientBlock
                    id="main"
                    name="Начинка"
                    ingredients={ingridients.main}
                />
            </div>
        </div>
    );
}
