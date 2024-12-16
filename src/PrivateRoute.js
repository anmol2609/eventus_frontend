import React from 'react';
import { Route, Navigate,Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  const {user_detail}=useSelector(state=>state.user_details)
  let id = document.cookie.split('; ')[0].split('=')[1]
  console.log(user_detail,"fdas",id)
  if (typeof id !== 'string') {
    return <Navigate to='/login' />
  }

  return children;
}