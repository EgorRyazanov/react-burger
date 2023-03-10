import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngridients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const Home = () => {
    return (
        <main>
            <div className="container flex pl-5 pr-5x">
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngridients />
                    <BurgerConstructor />
                </DndProvider>
            </div>
        </main>
    );
};

export default Home;
