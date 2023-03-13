import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngridients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useSelector } from 'react-redux';

const getUserFromStore = (state) => state.user.user;

const Home = () => {
    const userAuth = useSelector(getUserFromStore);
    return (
        <main>
            <div className='container flex pl-5 pr-5x'>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngridients />
                    <BurgerConstructor userLoaded={!!userAuth} />
                </DndProvider>
            </div>
        </main>
    );
};

export default Home;
