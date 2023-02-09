import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../../hoc/error-boundary';
import styles from './app.module.css';

function App() {
    return (
        <ErrorBoundary>
            <AppHeader />
            <main>
                <div className="container flex pl-5 pr-5x">
                    <BurgerIngridients />
                    <BurgerConstructor />
                </div>
            </main>
        </ErrorBoundary>
    );
}

export default App;
