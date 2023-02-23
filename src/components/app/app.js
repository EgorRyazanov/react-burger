import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../../hoc/error-boundary';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    return (
        <ErrorBoundary>
            <AppHeader />
            <main>
                <div className="container flex pl-5 pr-5x">
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngridients />
                        <BurgerConstructor />
                    </DndProvider>
                </div>
            </main>
        </ErrorBoundary>
    );
}

export default App;
