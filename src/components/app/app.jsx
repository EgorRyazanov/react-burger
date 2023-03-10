import React from 'react';
import AppHeader from '../app-header/app-header';
import ErrorBoundary from '../../hoc/error-boundary';
import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/login-page/login-page';
import Register from '../../pages/register-page/register-page';
import ForgotPassword from '../../pages/forgot-password-page/forgot-password-page';
import ResetPassword from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import ProfileUserInformationPage from '../../pages/profile-user-information-page/profile-user-information-page';
import ProtectedRoute from '../protected-route/protected-route';
import UnloginRoute from '../unlogin-route/unlogin-route';
import ModalSwitch from '../modal-switch/modal-switch';
import NotFound from '../../pages/not-found/not-found';
import { useLocation } from 'react-router-dom';
import Home from '../../pages/main-page/main-page';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
    const location = useLocation();
    let background = location.state && location.state.background;
    return (
        <ErrorBoundary>
            <AppHeader />
            <Routes location={background || location}>
                <Route
                    path='/login'
                    element={<UnloginRoute element={<Login />} />}
                />
                <Route
                    path='/register'
                    element={<UnloginRoute element={<Register />} />}
                />
                <Route
                    path='/forgot-password'
                    element={<UnloginRoute element={<ForgotPassword />} />}
                />
                <Route
                    path='/reset-password'
                    element={<UnloginRoute element={<ResetPassword />} />}
                />
                <Route
                    path='/profile'
                    element={<ProtectedRoute element={<ProfilePage />} />}
                >
                    <Route index element={<ProfileUserInformationPage />} />
                </Route>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Home />} />
                <Route
                    path='/ingredients/:ingredientId'
                    element={<IngredientDetails />}
                />
            </Routes>
            <ModalSwitch background={background} />
        </ErrorBoundary>
    );
}

export default App;
