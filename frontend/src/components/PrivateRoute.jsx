import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {

    // if current user exist we show profile section i.e outlet else navigate to signIn page
    
    const {currentUser} = useSelector((state)=>state.user);

  return  currentUser ? <Outlet /> : <Navigate to={'/'} />
}

export default PrivateRoute