import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../../hoc/error-boundary';
import { ApiContext } from '../../services/apiContext';
import { getData } from '../../utils/api';

function App() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        getData().then((result) => setData(result.data));
    }, []);

    return (
        <ErrorBoundary>
            <AppHeader />
            <main>
                <div className="container flex pl-5 pr-5x">
                    <ApiContext.Provider value={{ data, setData }}>
                        <BurgerIngridients />
                        <BurgerConstructor />
                    </ApiContext.Provider>
                </div>
            </main>
        </ErrorBoundary>
    );
}

export default App;
