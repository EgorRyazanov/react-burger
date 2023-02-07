import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingridients.module.css';
import Card from '../card/card';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export default function BurgerIngridients(probs) {
    const [current, setCurrent] = React.useState('bun');
    const [data, setData] = React.useState([]);
    const [ingridients, setIngridients] = React.useState({
        buns: [],
        sauces: [],
        main: [],
    });

    const handleTabScroll = (element) => {
        setCurrent(element);
        document.getElementById(element).scrollIntoView();
    };

    const getData = async () => {
        await fetch(URL)
            .then((response) => response.json())
            .then((result) => setData(result.data))
            .catch((error) => console.log(error));
    };

    React.useEffect(() => {
        getData();
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

    return (
        <div className="pt-10 mr-10" style={{ width: 600, height: 912 }}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <div className="mb-10" style={{ display: 'flex' }}>
                <Tab
                    value="bun"
                    active={current === 'bun'}
                    onClick={handleTabScroll}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={current === 'sauce'}
                    onClick={handleTabScroll}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={current === 'main'}
                    onClick={handleTabScroll}
                >
                    Начинки
                </Tab>
            </div>
            <div className={styles.scroll} style={{ height: 716 }}>
                <div id="bun" className="mb-10">
                    <p className="text text_type_main-large mb-2">Булки</p>
                    <div className={`flex pt-6 pl-4 pr-2 ${styles.container}`}>
                        {ingridients.buns.map((bun) => (
                            <Card key={bun._id} element={bun} />
                        ))}
                    </div>
                </div>
                <div id="sauce" className="mb-10">
                    <p className="text text_type_main-large mb-6">Соусы</p>
                    <div className={`flex pt-6 pl-4 pr-2 ${styles.container}`}>
                        {ingridients.sauces.map((sauce) => (
                            <Card key={sauce._id} element={sauce} />
                        ))}
                    </div>
                </div>
                <div id="main">
                    <p className="text text_type_main-large mb-6">Начинка</p>
                    <div className={`flex pt-6 pl-4 pr-2 ${styles.container}`}>
                        {ingridients.main.map((main) => (
                            <Card key={main._id} element={main} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
