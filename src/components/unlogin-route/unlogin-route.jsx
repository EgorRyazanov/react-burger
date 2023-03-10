import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser, fetchRefresh } from '../../utils/api/user-request';
import { updateUserAction, clearUserAction } from '../../services/actions/user';
import getAccessToken from '../../utils/get-access-token';

const getUserFromStore = (state) => state.user.user;

const UnloginRoute = ({ element }) => {
    const userAuth = useSelector(getUserFromStore);
    const dispatch = useDispatch();
    const [isUserLoaded, setUserLoaded] = React.useState(false);
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
        setUserLoaded(true);
    };
    React.useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return !userAuth ? element : <Navigate to='/' replace />;
};

export default UnloginRoute;
