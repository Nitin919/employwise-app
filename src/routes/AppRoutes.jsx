import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../components/Login';
import UsersList from '../pages/UsersList';
import UserDetails from '../pages/UserDetails';
import EditUserPage from '../pages/EditUserPage';

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Login />} />


      <Route path="/users" element={<UsersList />} />

      <Route path="/users/:id" element={<UserDetails />} />

      <Route path="/edit/:id" element={<EditUserPage />} />


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
