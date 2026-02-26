import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('ruhiya_admin_token');

    // If token exists, render child routes, otherwise redirect to login
    return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
