import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import styles from './app.module.css';

function App() {
    return (
        <>
            <AppHeader />
            <main>
                <div className="container flex pl-5 pr-5x">
                    <BurgerIngridients />
                </div>
            </main>
        </>
    );
}

export default App;
