import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngridients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TRootState } from '../../services/reducers/root';

const getUserFromStore = (state: TRootState) => state.user.user;

const Home: FC = () => {
    const userAuth = useTypedSelector(getUserFromStore);
    return (
        <main>
            <div className='container flex pl-5 pr-5'>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngridients />
                    <BurgerConstructor userLoaded={!!userAuth} />
                </DndProvider>
            </div>
        </main>
    );
};

export default Home;
