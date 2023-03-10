import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngridients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchRefresh } from '../../utils/api/user-request';
import { updateUserAction, clearUserAction } from '../../services/actions/user';
import getAccessToken from '../../utils/get-access-token';

const getUserFromStore = (state) => state.user.user;

const Home = () => {
    const userAuth = useSelector(getUserFromStore);
    const dispatch = useDispatch();
    const init = async () => {
        try {
            const res = await getUser();
            const { user } = res;
            dispatch(updateUserAction(user));
        } catch {
            try {
                const refreshRes = await fetchRefresh();
                const { accessToken, refreshToken } = refreshRes;
                localStorage.setItem(
                    'accessToken',
                    getAccessToken(accessToken)
                );
                localStorage.setItem('refreshToken', refreshToken);
                const resUser = await getUser();
                const { user } = resUser;
                dispatch(updateUserAction(user));
            } catch {
                localStorage.clear();
                dispatch(clearUserAction);
            }
        }
    };
    React.useEffect(() => {
        init();
    }, []);
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
