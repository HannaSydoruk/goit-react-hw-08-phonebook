import { ContactsPage } from 'pages/ContactsPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';
import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import UserMenu from './UserMenu/UserMenu';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/authSlice.selectors';
import { apiRefreshUser } from '../redux/auth/authSlice';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return (
    <div>
      <header>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </header>

      <Suspense fallback={<p>Loading</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};
