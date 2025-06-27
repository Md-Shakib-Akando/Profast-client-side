import React from 'react';
import UseAuth from './UseAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading}=UseAuth();
    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user){
        return <Navigate to='/authLayout/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;