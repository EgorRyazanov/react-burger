import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const getUserFromStore = (state) => state.user.user;

const ProtectedRoute = ({ element, anonymous }) => {
    const userAuth = useSelector(getUserFromStore);
    const location = useLocation();
    const from = location.state?.from || '/';
    if (anonymous && userAuth) {
        return <Navigate to={from} />;
    }

    if (!anonymous && !userAuth) {
        return <Navigate to='/login' state={{ from: location }} />;
    }

    return element;
    // const location = useLocation();
    // const from = location;
    // const userAuth = useSelector(getUserFromStore);
    // const dispatch = useDispatch();

    // return userAuth ? element : <Navigate to='/login' replace />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
