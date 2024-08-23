import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: { component: React.ComponentType<any> } & RouteProps) => {
    const isAuthenticated = localStorage.getItem('token') ? true : false;

    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
