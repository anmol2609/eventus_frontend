import React from 'react';
import { Route, Navigate,Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useSelector } from 'react-redux';
const PrivateRoute = ({ children }) => {
  
  return (
    // <Route
    //   {...rest}
    //   render={(props) =>
    //     user_detail ? <Component {...props} /> : Navigate('/login')
    //   }
    // />
    user_detail  ? children : <Navigate to="/login" />
  );
};
export default PrivateRoute;