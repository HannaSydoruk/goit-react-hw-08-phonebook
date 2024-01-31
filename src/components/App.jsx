import { ContactsPage } from 'pages/ContactsPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

export const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<p>Loading</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
